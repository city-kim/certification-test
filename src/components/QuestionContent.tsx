import { Fragment, type ReactNode } from 'react';
import type { QuestionContentNode } from '../lib/types';
import QuestionImage from './QuestionImage';
import './QuestionContent.css';

/** Render parsed content with React text nodes, never arbitrary source HTML. */
export default function QuestionContent({ content, prefix, hideImages = false }: { content: QuestionContentNode[]; prefix?: ReactNode; hideImages?: boolean }) {
  function render(nodes: QuestionContentNode[]): ReactNode {
    return nodes.map((node, index) => {
      if (typeof node === 'string') return <Fragment key={index}>{node}</Fragment>;
      const children = node.children ? render(node.children) : null;
      switch (node.tag) {
        case 'br': return <br key={index} />;
        case 'img': return node.src ? <QuestionImage key={node.src} src={node.src} alt={node.alt ?? '문제 참고 그림'} collapsible={hideImages} /> : null;
        case 'box': return <div key={index} className="question-box">{children}</div>;
        case 'p': return <p key={index}>{children}</p>;
        case 'strong': return <strong key={index}>{children}</strong>;
        case 'em': return <em key={index}>{children}</em>;
        case 'sub': return <sub key={index}>{children}</sub>;
        case 'sup': return <sup key={index}>{children}</sup>;
      }
    });
  }
  const trimmed = [...content];
  const empty = (node: QuestionContentNode) => typeof node === 'string' ? !node.trim() : node.tag === 'br';
  while (trimmed.length && empty(trimmed[0])) trimmed.shift();
  while (trimmed.length && empty(trimmed[trimmed.length-1])) trimmed.pop();
  return <div className="question-content">{prefix}{render(trimmed)}</div>;
}
