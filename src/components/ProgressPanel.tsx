import { TriangleAlert } from 'lucide-react';
import type { HomeUiCopy } from '@lib/ui-copy';
import type { TranscriptionStatus } from '@lib/types';

interface ProgressPanelProps {
  status: TranscriptionStatus;
  progress: number;
  error?: string;
  estimatedRemainingSeconds?: number | null;
  copy: HomeUiCopy['progress'];
}

export function ProgressPanel({
  status,
  progress,
  error,
  estimatedRemainingSeconds,
  copy
}: ProgressPanelProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));
  const progressLabel =
    status === 'complete'
      ? copy.labels.complete
      : status === 'loading-model'
        ? copy.labels.loadingModel
        : status === 'transcribing'
          ? copy.labels.transcribing
          : status === 'error'
            ? copy.labels.stopped
            : copy.labels.ready;
  const isEstimating =
    (status === 'loading-model' || status === 'transcribing') &&
    typeof estimatedRemainingSeconds === 'number';
  const estimateLabel = isEstimating
    ? estimatedRemainingSeconds <= 0
      ? copy.estimateMayVary
      : estimatedRemainingSeconds < 60
        ? copy.estimatedLessThanMinute
        : copy.estimatedRemaining(Math.ceil(estimatedRemainingSeconds / 60))
    : null;

  return (
    <section className="tool-section progress-panel" aria-labelledby="progress-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="progress-title">{copy.title}</h2>
      </div>

      <div className="progress-status-row">
        <span>{progressLabel}</span>
        <strong>{Math.round(safeProgress)}%</strong>
        {estimateLabel ? <span className="progress-estimate">{estimateLabel}</span> : null}
      </div>

      <div className="progress-track" aria-label={copy.ariaLabel}>
        <span style={{ width: `${safeProgress}%` }} />
      </div>

      {error ? (
        <p className="form-message form-message-error">
          <TriangleAlert size={16} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </section>
  );
}
