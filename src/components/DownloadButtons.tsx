import { Captions, FileText, Music2, Rows3 } from 'lucide-react';
import { downloadFile, filenameWithoutExtension } from '@lib/download';
import {
  segmentsToLRC,
  segmentsToPlainText,
  segmentsToSRT,
  segmentsToVTT
} from '@lib/transcript-format';
import type { HomeUiCopy } from '@lib/ui-copy';
import type { TranscriptSegment } from '@lib/types';

interface DownloadButtonsProps {
  sourceFilename: string;
  segments: TranscriptSegment[];
  copy: HomeUiCopy['export'];
}

export function DownloadButtons({ sourceFilename, segments, copy }: DownloadButtonsProps) {
  const disabled = segments.length === 0;
  const baseName = filenameWithoutExtension(sourceFilename || 'transcript');

  const downloads = [
    {
      label: 'TXT',
      extension: 'txt',
      icon: FileText,
      description: copy.formats.txt,
      mimeType: 'text/plain;charset=utf-8',
      content: () => segmentsToPlainText(segments)
    },
    {
      label: 'SRT',
      extension: 'srt',
      icon: Rows3,
      description: copy.formats.srt,
      mimeType: 'application/x-subrip;charset=utf-8',
      content: () => segmentsToSRT(segments)
    },
    {
      label: 'VTT',
      extension: 'vtt',
      icon: Captions,
      description: copy.formats.vtt,
      mimeType: 'text/vtt;charset=utf-8',
      content: () => segmentsToVTT(segments)
    },
    {
      label: 'LRC',
      extension: 'lrc',
      icon: Music2,
      description: copy.formats.lrc,
      mimeType: 'text/plain;charset=utf-8',
      content: () => segmentsToLRC(segments)
    }
  ];

  return (
    <section className="export-section" aria-label={copy.ariaLabel}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <div className="download-row">
      {downloads.map((item) => {
        const Icon = item.icon;
        return (
          <div className="download-format" key={item.extension}>
            <button
              className="button secondary-button"
              disabled={disabled}
              type="button"
              onClick={() =>
                downloadFile(`${baseName}.${item.extension}`, item.content(), item.mimeType)
              }
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </button>
            <p className="format-description">{item.description}</p>
          </div>
        );
      })}
      </div>
    </section>
  );
}
