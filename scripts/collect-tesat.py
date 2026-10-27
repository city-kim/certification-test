"""Inventory official TESAT study pages. Only metadata goes into the repository.

Public article text is cached under /tmp for editorial review, never published.
Login redirects are recorded as blocked; this script does not read browser cookies.
"""
import concurrent.futures
import datetime as dt
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path('/tmp/tesat-editorial')
CACHE.mkdir(exist_ok=True)
OUT = ROOT / 'src/data/tesat'
OUT.mkdir(parents=True, exist_ok=True)

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(c.text() if isinstance(c, Node) else c for c in self.children)
    def find(self, predicate):
        found = [self] if predicate(self) else []
        for c in self.children:
            if isinstance(c, Node): found.extend(c.find(predicate))
        return found
    def cls(self, name): return name in self.attrs.get('class', '').split()

class Parser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in ('br','img','input','meta','link','hr','source','wbr','area','embed','param'):
            self.stack.append(node)
        elif tag == 'br': self.stack[-1].children.append('\n')
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag, attrs)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                if tag in ('p','div','li','tr'): self.stack[i].children.append('\n')
                self.stack = self.stack[:i]
                return
    def handle_data(self, data): self.stack[-1].children.append(data)

def clean(s): return re.sub(r'[ \t\r\xa0]+', ' ', s).strip()
def iso(s):
    m = re.search(r'(20\d\d)[.\-/]\s*(\d{2})[.\-/]\s*(\d{2})', s)
    return '-'.join(m.groups()) if m else None

def fetch(url):
    key = hashlib.sha256(url.encode()).hexdigest()[:20]
    path = CACHE / (key + '.json')
    if path.exists(): return json.loads(path.read_text())
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0 (TESAT personal study inventory)'})
            with urllib.request.urlopen(req, timeout=25) as r:
                raw = r.read()
                enc = r.headers.get_content_charset() or ('cp949' if 'tesat.or.kr' in url else 'utf-8')
                result = {'url': r.url, 'html': raw.decode(enc, 'replace')}
            path.write_text(json.dumps(result, ensure_ascii=False))
            return result
        except Exception:
            if attempt == 2: raise
            time.sleep(1)

def listing(source, page):
    base = {'quiz':'https://sgsg.hankyung.com/sgplus/quiz', 'taste':'https://sgsg.hankyung.com/tag/20211217163104164', 'today':'https://www.tesat.or.kr/bbs.frm.list/tesat_study?s_cateno=1'}[source]
    url = base + ('&' if '?' in base else '?') + f'page={page}'
    s = fetch(url)['html']
    if source != 'today':
        rows = []
        for chunk in re.findall(r'<li class="item[^>]*>(.*?)</li>', s, re.S):
            a = re.search(r'<h3 class="news-tit"><a href="([^"]+)">(.*?)</a>', chunk,re.S)
            date = re.search(r'<span class="date">(.*?)</span>',chunk,re.S)
            if a and date:
                rows.append({'source':source,'url':html.unescape(a[1]),'title':html.unescape(re.sub('<[^>]+>','',a[2])),'publishedAt':iso(date[1])})
        return rows
    tree = Parser(s).root
    rows = []
    for tr in tree.find(lambda n:n.tag=='tr'):
        links = tr.find(lambda n:n.tag=='a' and '/bbs.frm.view/tesat_study?' in n.attrs.get('href',''))
        if links and iso(tr.text()):
            rows.append({'source':source,'url':urllib.parse.urljoin(base,links[0].attrs['href']),'title':clean(links[0].text()),'publishedAt':iso(tr.text())})
    return rows

def article(record):
    result = dict(record)
    result['id'] = record['source'] + '-' + (urllib.parse.parse_qs(urllib.parse.urlparse(record['url']).query).get('no',[record['url'].split('/')[-1]])[0])
    result['kind'] = 'terms' if '용어 따라잡기' in result['title'] else 'questions'
    try:
        response = fetch(record['url'])
        if 'hankyung.com' in response['url'] and any(x in response['url'] for x in ['login','member.hankyung','id.hankyung']):
            result.update(status='login-required', questionCount=None, imageCount=None)
            return result
        tree = Parser(response['html']).root
        body = tree.find(lambda n:n.cls('article-body') or n.cls('txt_view01'))
        if not body:
            result.update(status='review', questionCount=None, imageCount=None, note='본문 영역 확인 필요')
            return result
        body = body[0]
        text = clean(body.text())
        dates = tree.find(lambda n:n.cls('input'))
        if dates and iso(dates[0].text()): result['publishedAt'] = iso(dates[0].text())
        count = len(re.findall(r'\[문제\s*\d*\]',text))
        if result['source']=='quiz':
            answers = text.split('정답')[-1]
            count = len(re.findall(r'\d+\s*[①②③④⑤]', answers))
        images = [urllib.parse.urljoin(record['url'],n.attrs['src']) for n in body.find(lambda n:n.tag=='img' and 'src' in n.attrs)]
        result.update(status='public-accessible',questionCount=count if result['kind']=='questions' else 0,imageCount=len(images))
        (CACHE/(result['id']+'.txt')).write_text(text)
        (CACHE/(result['id']+'-images.json')).write_text(json.dumps(images))
    except Exception as e:
        result.update(status='fetch-error',questionCount=None,imageCount=None,note=type(e).__name__)
    return result

def main():
    articles, ranges = [], []
    for source in ('quiz','taste','today'):
        seen, candidates = set(), []
        end = start = None
        for page in range(1,40):
            rows = listing(source,page)
            if not rows: raise RuntimeError(f'{source}: empty listing {page}')
            if end is None:
                end = max(r['publishedAt'] for r in rows)
                start = str(dt.date.fromisoformat(end).replace(year=int(end[:4])-1))
            for row in rows:
                if row['url'] not in seen and start <= row['publishedAt'] <= end:
                    candidates.append(row)
                seen.add(row['url'])
            print(source, page, len(candidates),flush=True)
            if min(r['publishedAt'] for r in rows)<start: break
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            records = list(pool.map(article,candidates))
        records = [r for r in records if start<=r['publishedAt']<=end]
        articles.extend(records)
        ranges.append({'source':source,'start':start,'end':end,'basis':'latest-published'})
    end = next(x['end'] for x in ranges if x['source']=='today')
    date = dt.date.fromisoformat(end)
    month = date.month-6
    start = str(date.replace(year=date.year-(month<=0),month=month if month>0 else month+12))
    ranges.append({'source':'current-terms','start':start,'end':end,'basis':'today-latest-published'})
    for a in articles:
        a['included'] = a['kind']=='questions' or start<=a['publishedAt']<=end
    manifest={'collectedAt':'2026-10-27','ranges':ranges,'articles':articles,'contentPolicy':'Original articles stay at their source URLs. App exercises and explanations are independently authored.'}
    (OUT/'sources.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'ranges':ranges,'articles':len(articles),'blocked':[a['id'] for a in articles if a['status']!='public-accessible']},ensure_ascii=False),flush=True)

if __name__=='__main__': main()
