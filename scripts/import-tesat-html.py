"""Split user-supplied HTML arrays into original multiple-choice questions.

Only visible text and a small structured markup vocabulary are retained. HTML is
never executed. All answer keys are read from the supplied documents, not guessed.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src/data/tesat/imports'
MARKERS = '①②③④⑤'
VOID = {'br', 'img', 'hr', 'meta', 'link', 'input', 'source', 'wbr', 'area'}
SKIP = {'script', 'style', 'svg', 'button', 'iframe', 'form', 'noscript'}
BLOCK = {'div', 'p', 'blockquote', 'figure', 'li', 'tr'}

@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Any] = field(default_factory=list)
    start: int = 0
    end: int = 0

@dataclass
class Text:
    text: str
    start: int = 0
    end: int = 0

class Document(HTMLParser):
    def __init__(self, html: str):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]
        self.feed(html)
        self.parts: list[str] = []
        self.position = 0
        self.flatten(self.root)
        self.text = ''.join(self.parts)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(Text(re.sub(r'\s+', ' ', data)))

    def append(self, text):
        self.parts.append(text)
        self.position += len(text)

    def ignored(self, node):
        return node.tag in SKIP or 'summary' in node.attrs.get('class', '').split()

    def flatten(self, node):
        node.start = self.position
        if isinstance(node, Text):
            self.append(node.text)
        elif not self.ignored(node):
            if node.tag == 'table':
                raise ValueError('Table layout requires an explicit supported conversion')
            if node.tag in BLOCK:
                self.append('\n')
            if node.tag in ('br', 'hr'):
                self.append('\n')
            elif node.tag == 'img':
                self.append('\ufffc')
            else:
                for child in node.children:
                    self.flatten(child)
            if node.tag in BLOCK:
                self.append('\n')
        node.end = self.position

    def content(self, start, end):
        def clip(node):
            if node.end <= start or node.start >= end:
                return []
            if isinstance(node, Text):
                text = node.text[max(0, start-node.start):max(0, min(node.end, end)-node.start)]
                return [text] if text else []
            if self.ignored(node):
                return []
            if node.tag == 'br':
                return [{'tag': 'br'}]
            if node.tag == 'img':
                src = node.attrs.get('src', '')
                if not re.match(r'^https://img\.hankyung\.com/[^\s]+\.(?:png|jpe?g|webp)(?:\?[^\s]*)?$', src, re.I):
                    raise ValueError('Unsupported image source: '+src)
                return [{'tag': 'img', 'src': src, 'alt': node.attrs.get('alt', '문제 참고 그림')}]
            children = [part for child in node.children for part in clip(child)]
            if not children:
                return []
            if node.tag == 'blockquote' or 'box-cont' in node.attrs.get('class', '').split():
                return [{'tag': 'box', 'children': children}]
            tag = {'b': 'strong', 'i': 'em'}.get(node.tag, node.tag)
            if tag in ('p', 'strong', 'em', 'sub', 'sup'):
                return [{'tag': tag, 'children': children}]
            return children
        return clip(self.root)


def clean(text):
    text = text.replace('\ufffc', '')
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r' *\n *', '\n', text)
    return re.sub(r'\n{3,}', '\n\n', text).strip()


def canonical(text):
    return re.sub(r'\s+', '', text)


def choices(text, absolute_start):
    markers = list(re.finditer('[①②③④⑤]', text))
    candidate = None
    for i, marker in enumerate(markers):
        tail = markers[i:]
        sequence = ''.join(m.group() for m in tail)
        if sequence in (MARKERS[:4], MARKERS):
            options = [clean(text[m.end():tail[j+1].start() if j+1 < len(tail) else len(text)]) for j, m in enumerate(tail)]
            if all(options):
                candidate = (absolute_start+marker.start(), options)
                break
    if candidate is None:
        raise ValueError('Cannot locate an intact ordered set of 4/5 choices')
    return candidate


def image_sources(content):
    return [src for node in content if isinstance(node, dict)
            for src in ([node['src']] if node['tag']=='img' else image_sources(node.get('children', [])))]


def parse_article(source: str, html: str, capture_index: int):
    doc = Document(html)
    text = doc.text
    if source == 'quiz':
        answer_key = re.search(r'(?:▶\s*)?정답\s*[:：]', text)
        if not answer_key:
            raise ValueError('Missing quiz answer table')
        keys = re.findall(r'(\d+)\s*([①②③④⑤])', text[answer_key.end():])
        answers = {int(number): MARKERS.index(marker) for number, marker in keys}
        if len(answers) != len(keys):
            raise ValueError('Duplicate number in quiz answer table')
        markers = list(re.finditer(r'(?:^|\n)\s*(\d+)\.\s*', text[:answer_key.start()]))
        content_end = answer_key.start()
    elif source == 'taste':
        markers = list(re.finditer(r'\[문제\s*(\d*)\]', text))
        content_end = len(text)
        answers = {}
    else:
        raise ValueError('Unknown source '+source)
    if not markers:
        raise ValueError('No question boundaries found')
    result = []
    for index, marker in enumerate(markers):
        number = int(marker.group(1)) if marker.group(1) else index+1
        if number != index+1:
            raise ValueError(f'Question numbers are not consecutive: {number} at {index+1}')
        start, end = marker.end(), markers[index+1].start() if index+1<len(markers) else content_end
        body = text[start:end]
        official_explanation = None
        if source == 'taste':
            explanation_marker = re.search(r'\[해설\]', body)
            if not explanation_marker:
                raise ValueError(f'Q{number}: Missing official explanation')
            choice_text = body[:explanation_marker.start()]
            official_explanation = clean(body[explanation_marker.end():])
            found = re.findall(r'정답\s*(?:\]|은|[:：])?\s*([①②③④⑤])', official_explanation)
            if not found:
                raise ValueError(f'Q{number}: Missing official answer')
            answer = MARKERS.index(found[-1])
        else:
            choice_text = body
            if number not in answers:
                raise ValueError(f'Q{number}: Not present in official answer table')
            answer = answers[number]
        option_start, options = choices(choice_text, start)
        if not 0 <= answer < len(options):
            raise ValueError(f'Q{number}: Answer outside the choices')
        question = clean(text[start:option_start])
        content = doc.content(start, option_start)
        if not question:
            raise ValueError(f'Q{number}: Empty question')
        duplicates = [[MARKERS[i] for i, value in enumerate(options) if value == option]
                      for option in dict.fromkeys(options) if options.count(option) > 1]
        issues = ['제공 원문에서 '+ '·'.join(group)+' 보기의 문구가 같습니다. 원문 그대로 표시합니다.' for group in duplicates]
        result.append({'source': source, 'captureIndex': capture_index, 'originalNumber': number,
                       'question': question, 'content': content, 'options': options, 'answerIndex': answer,
                       'officialExplanation': official_explanation, 'images': image_sources(content), 'issues': issues})
    if source == 'quiz' and set(answers) != {q['originalNumber'] for q in result}:
        raise ValueError('Question count and answer table do not match')
    return result


def import_files(inputs):
    parsed, articles, errors = [], [], []
    for source, path in inputs.items():
        documents = json.loads(Path(path).read_text())
        if not isinstance(documents, list) or not all(isinstance(html, str) for html in documents):
            raise ValueError(f'{source}: expected an array of HTML strings')
        for index, html in enumerate(documents, 1):
            try:
                questions = parse_article(source, html, index)
                parsed.extend(questions)
                articles.append({'source':source,'captureIndex':index,'questionCount':len(questions),
                                 'sha256':hashlib.sha256(html.encode()).hexdigest(), 'status':'parsed'})
            except ValueError as error:
                errors.append({'source':source,'captureIndex':index,'error':str(error)})
    warnings=[{'source':q['source'],'captureIndex':q['captureIndex'],'number':q['originalNumber'],'issues':q['issues']} for q in parsed if q['issues']]
    return parsed, {'articles':articles,'errors':errors,'warnings':warnings,'questionCount':len(parsed)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--quiz', type=Path, default=DATA/'raw/quiz.json')
    parser.add_argument('--taste', type=Path, default=DATA/'raw/taste.json')
    args = parser.parse_args()
    parsed, report = import_files({'quiz':args.quiz,'taste':args.taste})
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA/'parsed-questions.json').write_text(json.dumps(parsed, ensure_ascii=False, indent=2)+'\n')
    (DATA/'import-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    print(json.dumps({'articles':len(report['articles']),'questions':len(parsed),'errors':report['errors'],'warnings':report['warnings']},ensure_ascii=False,indent=2))
    if report['errors']:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
