import { describe, expect, it } from 'vitest';
import { validateFile } from './file-validation';

describe('file validation', () => {
  it('accepts common video files without speculative codec warnings', () => {
    const file = new File(['video'], 'clip.mp4', { type: 'video/mp4' });
    const result = validateFile(file);

    expect(result.valid).toBe(true);
    expect(result.fileInfo.category).toBe('video');
    expect(result.warnings.join(' ')).not.toContain('codec');
    expect(result.warnings.join(' ')).not.toContain('browser codec support');
  });
});
