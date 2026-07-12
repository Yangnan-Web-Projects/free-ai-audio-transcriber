import type { HomeUiCopy } from '@lib/ui-copy';
import type { TranscriptSegment } from '@lib/types';

interface TranscriptPreviewProps {
  text: string;
  segments: TranscriptSegment[];
  copy: HomeUiCopy['preview'];
}

export function TranscriptPreview({ text, segments, copy }: TranscriptPreviewProps) {
  const hasText = text.trim().length > 0;
  const formatPreviewTime = (seconds: number) => {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const wholeSeconds = Math.floor(safeSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(wholeSeconds).padStart(2, '0')}`;
  };

  return (
    <section className="tool-section result-section" aria-labelledby="preview-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="preview-title">{copy.title}</h2>
        <p>
          {segments.length > 0
            ? copy.segmentDescription(segments.length)
            : copy.emptyDescription}
        </p>
      </div>
      {segments.length > 0 ? (
        <div className="transcript-lines" aria-label={copy.timestampedAriaLabel}>
          {segments.map((segment, index) => (
            <div className="transcript-line" key={`${segment.start}-${segment.end}-${index}`}>
              <time>{formatPreviewTime(segment.start)}</time>
              <span>{segment.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <textarea
          value={hasText ? text : ''}
          placeholder={copy.placeholder}
          readOnly
          rows={12}
          aria-label={copy.ariaLabel}
        />
      )}
    </section>
  );
}
