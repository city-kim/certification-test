import { useId, useState } from 'react';
import { figureUrl } from '../data/questions';
import './QuestionImage.css';

/** Secret mode opts into hiding images; regular study shows them immediately. */
export default function QuestionImage({ src, alt, className = 'q-figure', collapsible = false }: { src: string; alt: string; className?: string; collapsible?: boolean }) {
  const [visible, setVisible] = useState(false);
  const contentId = useId();

  if (!collapsible) return <img className={className} src={figureUrl(src)} alt={alt} />;

  return <span className="question-image">
    <button type="button" className="question-image-toggle" aria-expanded={visible} aria-controls={contentId}
      onClick={() => setVisible(value => !value)}>{visible ? '[숨기기]' : '[보이기]'}</button>
    <span id={contentId} hidden={!visible}>
      {visible && <img className={className} src={figureUrl(src)} alt={alt} />}
    </span>
  </span>;
}
