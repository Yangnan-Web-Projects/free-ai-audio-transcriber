import { describe, expect, it } from 'vitest';
import {
  formatTimestampForSRT,
  formatTimestampForLRC,
  formatTimestampForVTT,
  segmentsToPlainText,
  segmentsToLRC,
  segmentsToSRT,
  segmentsToVTT
} from './transcript-format';

const segments = [
  { start: 0, end: 1.25, text: 'Hello world' },
  { start: 61.5, end: 65.01, text: 'Second line' }
];

describe('transcript format helpers', () => {
  it('formats SRT timestamps', () => {
    expect(formatTimestampForSRT(3661.789)).toBe('01:01:01,789');
  });

  it('formats VTT timestamps', () => {
    expect(formatTimestampForVTT(61.5)).toBe('00:01:01.500');
  });

  it('formats LRC timestamps', () => {
    expect(formatTimestampForLRC(61.5)).toBe('[01:01.50]');
  });

  it('creates plain text', () => {
    expect(segmentsToPlainText(segments)).toBe('Hello world\nSecond line');
  });

  it('creates SRT', () => {
    expect(segmentsToSRT(segments)).toContain('00:00:00,000 --> 00:00:01,250');
    expect(segmentsToSRT(segments)).toContain('Second line');
  });

  it('creates VTT', () => {
    expect(segmentsToVTT(segments)).toMatch(/^WEBVTT/);
    expect(segmentsToVTT(segments)).toContain('00:01:01.500 --> 00:01:05.010');
  });

  it('creates LRC', () => {
    expect(segmentsToLRC(segments)).toContain('[00:00.00]Hello world');
    expect(segmentsToLRC(segments)).toContain('[01:01.50]Second line');
  });
});
