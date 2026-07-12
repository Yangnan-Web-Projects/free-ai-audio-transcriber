import type { FileInfo, ValidationResult } from './types';

const SUPPORTED_AUDIO_EXTENSIONS = new Set(['mp3', 'wav', 'm4a', 'webm']);
const SUPPORTED_VIDEO_EXTENSIONS = new Set(['mp4', 'mov', 'webm', 'mkv']);
const SUPPORTED_MIME_PREFIXES = ['audio/', 'video/'];
const MAX_RECOMMENDED_BYTES = 250 * 1024 * 1024;
const LARGE_FILE_WARNING_BYTES = 100 * 1024 * 1024;

export function detectFileType(file: File): FileInfo {
  const extension = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() ?? '' : '';
  const mimeType = file.type.toLowerCase();
  const isAudio =
    mimeType.startsWith('audio/') || SUPPORTED_AUDIO_EXTENSIONS.has(extension);
  const isVideo =
    mimeType.startsWith('video/') || SUPPORTED_VIDEO_EXTENSIONS.has(extension);

  return {
    name: file.name,
    size: file.size,
    extension,
    category: isAudio ? 'audio' : isVideo ? 'video' : 'unknown',
    type: file.type || 'unknown'
  };
}

export function validateFile(file: File): ValidationResult {
  const fileInfo = detectFileType(file);
  const errors: string[] = [];
  const warnings: string[] = [];
  const hasKnownExtension =
    SUPPORTED_AUDIO_EXTENSIONS.has(fileInfo.extension) ||
    SUPPORTED_VIDEO_EXTENSIONS.has(fileInfo.extension);
  const hasKnownMime = SUPPORTED_MIME_PREFIXES.some((prefix) =>
    file.type.toLowerCase().startsWith(prefix)
  );

  if (!hasKnownExtension && !hasKnownMime) {
    errors.push('Please choose an MP3, WAV, M4A, WEBM, MP4, MOV, or MKV file.');
  }

  if (file.size <= 0) {
    errors.push('This file appears to be empty.');
  }

  if (file.size > MAX_RECOMMENDED_BYTES) {
    warnings.push(
      'This file is large for a browser-based MVP. Try a shorter clip first if your device has limited memory.'
    );
  } else if (file.size > LARGE_FILE_WARNING_BYTES) {
    warnings.push(
      'Large files can take a long time because transcription runs on your device.'
    );
  }

  return {
    valid: errors.length === 0,
    fileInfo,
    errors,
    warnings
  };
}

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}
