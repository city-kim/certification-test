import { useId, useState } from 'react';
import { figureUrl } from '../data/questions';
import './QuestionImage.css';

/** Keep question images and scanned tables closed until the learner opens them. */
export default function QuestionImage({ src, alt, className = 'q-figure' }: { src: string; alt: string; className?: string }) {
  const [visible, setVisible] = useState(false);
  const contentId = useId();

  return <span className="question-image">
    <button type="button" className="question-image-toggle" aria-expanded={visible} aria-controls={contentId}
      onClick={() => setVisible(value => !value)}>{visible ? '[숨기기]' : '[보이기]'}</button>
    <span id={contentId} hidden={!visible}>
      {visible && <img className={className} src={figureUrl(src)} alt={alt} />}
    </span>
  </span>;
}
