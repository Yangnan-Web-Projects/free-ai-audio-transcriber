import { UploadCloud, XCircle } from 'lucide-react';
import type { DragEvent } from 'react';
import { formatBytes } from '@lib/file-validation';
import type { HomeUiCopy } from '@lib/ui-copy';
import type { FileInfo, ValidationResult } from '@lib/types';

interface UploadBoxProps {
  file: File | null;
  validation: ValidationResult | null;
  copy: HomeUiCopy['upload'];
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export function UploadBox({ file, validation, copy, onFileSelect, onClear }: UploadBoxProps) {
  const fileInfo: FileInfo | undefined = validation?.fileInfo;

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files.item(0);

    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  return (
    <section className="tool-section" aria-labelledby="upload-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="upload-title">{copy.title}</h2>
      </div>
      <label
        className={`upload-box ${validation?.valid ? 'upload-box-ready' : ''}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".mp3,.wav,.m4a,.webm,.mp4,.mov,.mkv,audio/*,video/*"
          onChange={(event) => {
            const selectedFile = event.target.files?.item(0);
            if (selectedFile) {
              onFileSelect(selectedFile);
            }
          }}
        />
        <UploadCloud aria-hidden="true" size={34} />
        <span className="upload-title">{copy.dragDrop}</span>
        <span className="upload-link-text">{copy.browse}</span>
        <span className="upload-subtitle">{copy.formats}</span>
      </label>

      {file && fileInfo ? (
        <div className="file-summary">
          <div>
            <strong>{file.name}</strong>
            <span>
              {formatBytes(file.size)} · {copy.fileCategories[fileInfo.category]} ·{' '}
              {fileInfo.extension || fileInfo.type}
            </span>
          </div>
          <button className="icon-button" type="button" onClick={onClear} aria-label={copy.removeFile}>
            <XCircle size={20} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {validation?.errors.map((error) => (
        <p className="form-message form-message-error" key={error}>
          {error}
        </p>
      ))}

      {validation?.warnings.map((warning) => (
        <p className="form-message form-message-warning" key={warning}>
          {warning}
        </p>
      ))}
    </section>
  );
}
