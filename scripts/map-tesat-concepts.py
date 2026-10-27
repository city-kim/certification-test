"""Editorial index only: links reviewed concepts to source articles, no source prose."""
import json
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT/'src/data/tesat'
manifest=json.loads((DATA/'sources.json').read_text())
overrides=json.loads((DATA/'editorial.json').read_text())
concepts=[]
for line in (DATA/'concepts.psv').read_text().splitlines():
    if not line or line.startswith('#'): continue
    parts=line.split('|')
    assert len(parts)==7, parts[0]
    concepts.append((parts[0],parts[2],parts[6].split(';')))

def normal(s): return re.sub(r'\s+','',s).lower()
def match(alias,text):
    if re.fullmatch(r'[A-Za-z]+',alias): return bool(re.search(r'(?<![A-Za-z])'+re.escape(alias)+r'(?![A-Za-z])',text,re.I))
    return normal(alias) in normal(text)

mapping={}
for article in manifest['articles']:
    override=overrides.get(article['id'],{})
    article.update({k:v for k,v in override.items() if k!='conceptIds'})
    if not article['included']: continue
    textpath=Path('/tmp/tesat-editorial')/(article['id']+'.txt')
    text=textpath.read_text() if textpath.exists() else ''
    headers=re.findall(r'◾\s*([^=\n]+)=',text)
    # Match each heading separately: stripping whitespace across headings can
    # create false Korean words (e.g. '반대매매' + '파이어족' -> '매파').
    bases=[re.sub(r'\([^)]*\)','',h) for h in headers] if article['kind']=='terms' else [text]
    ids=[cid for cid,name,aliases in concepts if any(match(a,basis) for a in aliases if a for basis in bases)]
    ids=sorted(set(ids+override.get('conceptIds',[])))
    mapping[article['id']]=ids
    if not ids: print('UNMAPPED',article['id'],article['title'])
    if article['kind']=='terms':
        missed=[h for h in headers if not any(any(match(a,h) for a in aliases if a) for _,_,aliases in concepts)]
        print('TERMS',article['id'],'headings',len(headers),'concepts',len(ids),'unmapped',missed)
(DATA/'article-concepts.json').write_text(json.dumps(mapping,ensure_ascii=False,indent=2)+'\n')
print('Mapped articles:',len(mapping))
