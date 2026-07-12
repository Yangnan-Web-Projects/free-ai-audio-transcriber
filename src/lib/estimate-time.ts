import type { ModelOption } from './types';

export interface EstimateRemainingInput {
  model: ModelOption;
  audioDurationSeconds: number;
  elapsedSeconds: number;
  isWarmModel: boolean;
}

export function estimateTotalSeconds({
  model,
  audioDurationSeconds,
  isWarmModel
}: Pick<EstimateRemainingInput, 'model' | 'audioDurationSeconds' | 'isWarmModel'>) {
  const safeDuration = Math.max(0, audioDurationSeconds);
  const loadSeconds = isWarmModel ? 0 : model.estimatedLoadSeconds;
  return loadSeconds + safeDuration * model.estimatedRealtimeFactor;
}

export function estimateRemainingSeconds({
  model,
  audioDurationSeconds,
  elapsedSeconds,
  isWarmModel
}: EstimateRemainingInput) {
  const totalSeconds = estimateTotalSeconds({ model, audioDurationSeconds, isWarmModel });
  return Math.max(0, totalSeconds - Math.max(0, elapsedSeconds));
}
