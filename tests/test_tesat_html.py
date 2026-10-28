import html
import importlib.util
import json
import re
import sys
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('tesat_html',ROOT/'scripts/import-tesat-html.py')
module=importlib.util.module_from_spec(spec);sys.modules[spec.name]=module;spec.loader.exec_module(module)
parse_article=module.parse_article
DATA=ROOT/'src/data/tesat/imports'


def quiz(count):
    return ''.join(f'<strong>{i}.질문 {i}은?</strong><br>① 첫째 ② 둘째 ③ 셋째 ④ 넷째<br>' for i in range(1,count+1))+'<strong>▶정답 : '+ ' '.join(f'{i} ②' for i in range(1,count+1))+'</strong>'


class TesatHtmlTests(unittest.TestCase):
    def test_variable_question_counts_and_no_space_after_number(self):
        for count in [1,2,8,12]:
            result=parse_article('quiz',quiz(count),1)
            self.assertEqual(len(result),count)
            self.assertEqual([q['originalNumber'] for q in result],list(range(1,count+1)))
            self.assertTrue(all(q['answerIndex']==1 and len(q['options'])==4 for q in result))

    def test_box_combination_choices_and_explanation(self):
        source='''[문제1] 사건과 관련된 것을 고르면?<div class="box-cont">사건의 수치 1,972와 0.5%P</div><blockquote>ㄱ. 내용 A<br>ㄴ. 내용 B</blockquote>① ㄱ ② ㄴ ③ ㄱ, ㄴ ④ 모두 아님 ⑤ 알 수 없음<br>[해설] 조건을 함께 판단한다. 정답 ③'''
        q=parse_article('taste',source,1)[0]
        self.assertIn('1,972와 0.5%P',q['question'])
        self.assertIn('ㄱ. 내용 A\nㄴ. 내용 B',q['question'])
        self.assertEqual(q['options'],['ㄱ','ㄴ','ㄱ, ㄴ','모두 아님','알 수 없음'])
        self.assertEqual(q['officialExplanation'],'조건을 함께 판단한다. 정답 ③')
        self.assertEqual(sum(isinstance(n,dict) and n['tag']=='box' for n in q['content']),2)

    def test_circled_references_in_stem_are_not_mistaken_for_choices(self):
        q=parse_article('taste','[문제] 참고 ① 증가, ② 감소를 비교하라.<br>① A ② B ③ C ④ D ⑤ E<br>[해설] 마지막 보기다. 정답 ⑤',1)[0]
        self.assertIn('참고 ① 증가, ② 감소',q['question'])
        self.assertEqual(q['options'],['A','B','C','D','E'])
        self.assertEqual(q['answerIndex'],4)

    def test_today_keeps_question_image_and_excludes_related_article_ad(self):
        picture='/data/service/www.tesat.or.kr/upload/bbs/tesat_study/image/04e6acb3bb284520817a86f3d28270c2'
        source=f'''<a href="https://example.com"><img src="{picture}"></a>
        <p><b>[</b><span>문제</span><b>]</b> 아래 항목과 관련한 지수를 고르면?</p>
        <p><img src="{picture}" onerror="alert(1)"></p>
        <p>① ㄱ, ㄴ ② ㄱ, ㄷ ③ ㄴ, ㄷ ④ ㄴ, ㄹ ⑤ ㄷ, ㄹ</p>
        <p>[ 해설 ] 식료품비와 주거비의 비중을 비교한다. <b>정답 ①</b></p>
        <p>☞ 함께 읽으면 유익한 기사</p><a href="https://example.com"><img src="{picture}"></a>'''
        q=parse_article('today',source,1)[0]
        self.assertEqual(q['options'],['ㄱ, ㄴ','ㄱ, ㄷ','ㄴ, ㄷ','ㄴ, ㄹ','ㄷ, ㄹ'])
        self.assertEqual(q['answerIndex'],0)
        self.assertEqual(q['images'],['https://www.tesat.or.kr'+picture])
        self.assertEqual(q['officialExplanation'],'식료품비와 주거비의 비중을 비교한다. 정답 ①')
        self.assertNotIn('함께 읽으면',q['officialExplanation'])
        self.assertEqual(len(parse_article('today',source.replace('[ 해설 ]','[해설]'),2)),1)

    def test_unsafe_markup_and_advertising_are_not_executed_or_kept(self):
        source='<div class="summary">광고</div><script>지시문과 실행문</script>'+quiz(2)
        q=parse_article('quiz',source,1)[0]
        self.assertNotIn('광고',q['question']);self.assertNotIn('지시문',q['question'])
        source='[문제] 그림은?<img src="https://img.hankyung.com/photo/figure.jpg" alt="조건" onerror="alert(1)">① A ② B ③ C ④ D ⑤ E [해설] 정답 ①'
        q=parse_article('taste',source,1)[0]
        image=next(n for n in q['content'] if isinstance(n,dict) and n['tag']=='img')
        self.assertEqual(set(image),{'tag','src','alt'})
        with self.assertRaises(ValueError):
            parse_article('taste',source.replace('https://img.hankyung.com/photo/figure.jpg','javascript:alert(1)'),1)

    def test_missing_answer_or_option_fails_instead_of_guessing(self):
        for source,value in [('quiz',quiz(2).replace('2 ②','')),('taste','[문제] 질문? ① A ② B ③ C [해설] 정답 ②'),('taste','[문제] 질문? ① A ② B ③ C ④ D ⑤ E [해설] 정답 없음')]:
            with self.assertRaises(ValueError):parse_article(source,value,1)

    def test_all_supplied_visible_words_choices_and_images_are_preserved(self):
        total=images=0
        for source in ['quiz','taste']:
            raw=json.loads((DATA/'raw'/f'{source}.json').read_text())
            self.assertEqual(len(raw),72)
            for index,s in enumerate(raw,1):
                plain=html.unescape(re.sub(r'<[^>]*>',' ',s))
                compact=lambda value:re.sub(r'\s+','',value)
                for q in parse_article(source,s,index):
                    total+=1;images+=len(q['images'])
                    self.assertIn(compact(q['question']),compact(plain))
                    for option in q['options']:self.assertIn(compact(option),compact(plain))
                    if q['officialExplanation']:self.assertIn(compact(q['officialExplanation']),compact(plain))
        self.assertEqual(total,792);self.assertEqual(images,4)

    def test_duplicate_original_options_are_reported_and_preserved(self):
        q=parse_article('quiz','<strong>1.질문?</strong>① A ② B ③ C ④ A<br>▶정답 : 1 ③',1)[0]
        self.assertEqual(q['options'],['A','B','C','A']);self.assertEqual(q['answerIndex'],2)
        self.assertTrue(q['issues'])

    def test_today_supplied_articles_and_reviewed_image_transcriptions(self):
        reviews=json.loads((DATA/'reviewed-imports.json').read_text())
        parsed,report=module.import_files({'today':DATA/'raw/today.json'},reviews)
        self.assertEqual(report['errors'],[])
        self.assertEqual(len(report['articles']),39)
        self.assertEqual(len(parsed),38)
        self.assertEqual(report['articles'][31]['kind'],'terms')
        self.assertEqual(report['articles'][31]['questionCount'],0)
        raw=json.loads((DATA/'raw/today.json').read_text())
        for q in parsed:
            original=raw[q['captureIndex']-1]
            if q['captureIndex']!=18:
                plain=html.unescape(re.sub(r'<[^>]*>',' ',original))
                compact=lambda value:re.sub(r'\s+','',value)
                self.assertIn(compact(q['question']),compact(plain))
                self.assertIn(compact(q['officialExplanation']),compact(plain))
                if q['captureIndex']!=11:
                    for option in q['options']:self.assertIn(compact(option),compact(plain))
            for image in q['images']:
                self.assertIn(image.removeprefix('https://www.tesat.or.kr'),original)
            self.assertNotIn('함께 읽으면',q['officialExplanation'])
        table=next(q for q in parsed if q['captureIndex']==11)
        self.assertEqual(len(table['images']),2)
        self.assertEqual(table['answerIndex'],4)
        graph=next(q for q in parsed if q['captureIndex']==18)
        self.assertEqual(graph['answerIndex'],4)
        self.assertIn('A+B+E',graph['options'][3])
        self.assertIn('E+F',graph['officialExplanation'])
        with self.assertRaisesRegex(ValueError,'no longer matches'):
            parse_article('today',raw[17]+'edited',18,reviews['today']['18'])


if __name__=='__main__':unittest.main()
