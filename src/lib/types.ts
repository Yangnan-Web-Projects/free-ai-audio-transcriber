export type ModelMode = 'blue-whale' | 'tiger' | 'fox' | 'ant';

export type ModelDtype = 'q4' | 'q8' | 'fp32';

export type LanguageCode =
  | 'auto'
  | 'english'
  | 'zh-hans'
  | 'zh-hant'
  | 'japanese'
  | 'korean'
  | 'spanish'
  | 'french'
  | 'german';

export type TranscriptionStatus =
  | 'idle'
  | 'ready'
  | 'loading-model'
  | 'transcribing'
  | 'complete'
  | 'error';

export interface TranscriptSegment {
  id?: number;
  start: number;
  end: number;
  text: string;
}

export interface TranscriptResult {
  text: string;
  segments: TranscriptSegment[];
  modelId: string;
  language: LanguageCode;
  generatedAt: string;
}

export interface DeviceInfo {
  hardwareConcurrency: number;
  deviceMemory?: number;
  isMobile: boolean;
  hasWebGPU: boolean;
}

export interface FileInfo {
  name: string;
  size: number;
  extension: string;
  category: 'audio' | 'video' | 'unknown';
  type: string;
}

export interface ValidationResult {
  valid: boolean;
  fileInfo: FileInfo;
  errors: string[];
  warnings: string[];
}

export interface ModelOption {
  mode: ModelMode;
  displayName: string;
  modelId: string;
  dtype: ModelDtype;
  chunkLengthSeconds: number;
  strideLengthSeconds: number;
  description: string;
  speed: string;
  accuracy: string;
  deviceLoad: string;
  useCase: string;
  firstRunEstimate: string;
  estimatedLoadSeconds: number;
  estimatedRealtimeFactor: number;
  badge?: string;
  experimental?: boolean;
}

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  whisperLanguage?: string;
  description: string;
}

export type ModelSourceId = 'official' | 'mirror';

export type WorkerPhase = 'loading-model' | 'transcribing' | 'normalizing';

export type WorkerErrorCode =
  | 'model-files'
  | 'model-init'
  | 'network'
  | 'memory'
  | 'normalization'
  | 'unknown';

export type WorkerRequest =
  | {
      type: 'start';
      audio: Float32Array;
      model: ModelOption;
      language: LanguageOption;
      modelHost: string;
    }
  | { type: 'cancel' };

export type WorkerResponse =
  | {
      type: 'ready';
    }
  | {
      type: 'heartbeat';
      phase: WorkerPhase;
    }
  | {
      type: 'model-progress';
      source: ModelSourceId;
      status: string;
      file?: string;
      progress?: number;
      loaded?: number;
      total?: number;
      message: string;
    }
  | {
      type: 'status';
      status: TranscriptionStatus;
      progress?: number;
      message: string;
    }
  | {
      type: 'complete';
      result: TranscriptResult;
    }
  | {
      type: 'error';
      code: WorkerErrorCode;
      message: string;
      details?: string;
    };
