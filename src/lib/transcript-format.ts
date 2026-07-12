import type { TranscriptSegment } from './types';

const clampSeconds = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return 0;
  }

  return seconds;
};

const pad = (value: number, size = 2) => String(value).padStart(size, '0');

const splitTime = (secondsInput: number) => {
  const seconds = clampSeconds(secondsInput);
  const totalMilliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(totalMilliseconds / 3_600_000);
  const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
  const secs = Math.floor((totalMilliseconds % 60_000) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  return { hours, minutes, seconds: secs, milliseconds };
};

export function formatTimestampForSRT(seconds: number) {
  const time = splitTime(seconds);
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)},${pad(time.milliseconds, 3)}`;
}

export function formatTimestampForVTT(seconds: number) {
  const time = splitTime(seconds);
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}.${pad(time.milliseconds, 3)}`;
}

export function formatTimestampForLRC(seconds: number) {
  const time = splitTime(seconds);
  const totalMinutes = time.hours * 60 + time.minutes;
  const centiseconds = Math.floor(time.milliseconds / 10);
  return `[${pad(totalMinutes)}:${pad(time.seconds)}.${pad(centiseconds)}]`;
}

function cleanText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function normalizeSegment(segment: TranscriptSegment, index: number): TranscriptSegment {
  const start = clampSeconds(segment.start);
  const fallbackEnd = start + 3;
  const end = segment.end > start ? clampSeconds(segment.end) : fallbackEnd;

  return {
    id: segment.id ?? index + 1,
    start,
    end,
    text: cleanText(segment.text)
  };
}

export function segmentsToPlainText(segments: TranscriptSegment[]) {
  return segments
    .map((segment) => cleanText(segment.text))
    .filter(Boolean)
    .join('\n');
}

export function segmentsToSRT(segments: TranscriptSegment[]) {
  return segments
    .map((segment, index) => normalizeSegment(segment, index))
    .filter((segment) => segment.text.length > 0)
    .map((segment, index) => {
      return [
        String(index + 1),
        `${formatTimestampForSRT(segment.start)} --> ${formatTimestampForSRT(segment.end)}`,
        segment.text
      ].join('\n');
    })
    .join('\n\n');
}

export function segmentsToVTT(segments: TranscriptSegment[]) {
  const body = segments
    .map((segment, index) => normalizeSegment(segment, index))
    .filter((segment) => segment.text.length > 0)
    .map((segment) => {
      return [
        `${formatTimestampForVTT(segment.start)} --> ${formatTimestampForVTT(segment.end)}`,
        segment.text
      ].join('\n');
    })
    .join('\n\n');

  return `WEBVTT\n\n${body}`;
}

export function segmentsToLRC(segments: TranscriptSegment[]) {
  return segments
    .map((segment, index) => normalizeSegment(segment, index))
    .filter((segment) => segment.text.length > 0)
    .map((segment) => `${formatTimestampForLRC(segment.start)}${segment.text}`)
    .join('\n');
}

export function textToFallbackSegments(text: string): TranscriptSegment[] {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?。！？])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const safeSentences = sentences.length > 0 ? sentences : [text.trim()].filter(Boolean);

  return safeSentences.map((sentence, index) => ({
    id: index + 1,
    start: index * 4,
    end: index * 4 + 4,
    text: sentence
  }));
}
