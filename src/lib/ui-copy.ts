import type { LanguageCode, ModelMode, WorkerErrorCode } from './types';

export type UiLanguageCode = Exclude<LanguageCode, 'auto'>;

interface LanguageOptionCopy {
  label: string;
  description: string;
}

interface ModelCopy {
  name: string;
  speed: string;
  accuracy: string;
  description: string;
}

export interface HomeUiCopy {
  browserTitle: string;
  tool: {
    title: string;
    subtitle: string;
    ariaLabel: string;
    steps: Array<{ title: string; description: string }>;
    actions: {
      start: string;
      cancel: string;
    };
    messages: {
      chooseFile: string;
      fileReady: string;
      workerFailed: string;
      fileTransferFailed: string;
      preparingText: string;
      complete: string;
      stopped: string;
      decoding: string;
      preparingModel: (modelName: string) => string;
      workerStartupTimeout: string;
      modelStalled: string;
      workerErrors: Record<WorkerErrorCode, string>;
      cancelled: string;
    };
    notices: {
      local: string;
      firstUse: string;
    };
  };
  upload: {
    eyebrow: string;
    title: string;
    dragDrop: string;
    browse: string;
    formats: string;
    removeFile: string;
    fileCategories: Record<'audio' | 'video' | 'unknown', string>;
  };
  model: {
    eyebrow: string;
    title: string;
    ariaLabel: string;
    accuracySuffix: string;
    loadSuffix: string;
    options: Record<ModelMode, ModelCopy>;
  };
  language: {
    eyebrow: string;
    title: string;
    ariaLabel: string;
    options: Record<LanguageCode, LanguageOptionCopy>;
  };
  progress: {
    eyebrow: string;
    title: string;
    ariaLabel: string;
    defaultMessage: string;
    estimatedRemaining: (minutes: number) => string;
    estimatedLessThanMinute: string;
    estimateMayVary: string;
    labels: {
      complete: string;
      loadingModel: string;
      transcribing: string;
      stopped: string;
      ready: string;
    };
  };
  preview: {
    eyebrow: string;
    title: string;
    placeholder: string;
    ariaLabel: string;
    timestampedAriaLabel: string;
    emptyDescription: string;
    segmentDescription: (count: number) => string;
  };
  export: {
    eyebrow: string;
    ariaLabel: string;
    formats: Record<'txt' | 'srt' | 'vtt' | 'lrc', string>;
  };
}

const english: HomeUiCopy = {
  browserTitle: 'Free AI Transcriber - Audio to Text, Subtitles & Lyrics',
  tool: {
    title: 'Free AI Audio to Text, Subtitles & Lyrics Tool',
    subtitle:
      'Use AI to turn audio or video into text, subtitles, and timed lyrics in your browser - no signup, install, setup, or fixed time limit.',
    ariaLabel: 'Free AI Transcriber tool',
    steps: [
      { title: 'Upload', description: 'Add your audio file' },
      { title: 'Transcribe', description: 'AI converts speech to text' },
      { title: 'Export', description: 'Download your transcript' }
    ],
    actions: {
      start: 'Start transcription',
      cancel: 'Cancel'
    },
    messages: {
      chooseFile: 'Please choose a supported audio or video file first.',
      fileReady: 'File ready. Choose settings and start transcription.',
      workerFailed:
        'The transcription worker failed to start. Try refreshing the page or using a newer browser.',
      fileTransferFailed:
        'The browser could not pass the selected file to the transcription worker.',
      preparingText: 'Preparing transcript text.',
      complete: 'Transcription complete. Review the text and export your files.',
      stopped: 'Transcription stopped.',
      decoding: 'Decoding the selected file locally in your browser.',
      preparingModel: (modelName) =>
        `Loading ${modelName} for browser-local transcription. This may take some time, please wait patiently.`,
      workerStartupTimeout:
        'The transcription worker did not start within 30 seconds. Refresh the page and try again.',
      modelStalled:
        'The model stopped responding for two minutes. Check the model files or your connection and try again.',
      workerErrors: {
        'model-files': 'One or more AI model files could not be read. Check the local model files and try again.',
        'model-init': 'The model files loaded, but this browser could not initialize the model. Try Ant Model or another browser.',
        network: 'The browser could not retrieve the model files. Check your connection and try again.',
        memory: 'The browser ran out of memory. Try a smaller model or close other tabs.',
        normalization: 'The transcript was created, but Chinese script conversion could not finish. Please try again.',
        unknown: 'Transcription failed. Try a different model or file.'
      },
      cancelled: 'Transcription cancelled.'
    },
    notices: {
      local: 'Your file is processed locally in your browser and is not uploaded to our server.',
      firstUse:
        'Loading the AI model and transcribing the file may take some time. If the progress bar does not move for a while, it is still processing. Please wait patiently.'
    }
  },
  upload: {
    eyebrow: 'Upload',
    title: 'Upload audio or video',
    dragDrop: 'Drag & drop an audio or video file here',
    browse: 'or click to browse',
    formats: 'MP3, WAV, M4A, MP4, MOV, MKV, and WebM',
    removeFile: 'Remove file',
    fileCategories: {
      audio: 'audio',
      video: 'video',
      unknown: 'unknown'
    }
  },
  model: {
    eyebrow: 'Model',
    title: 'Choose a model',
    ariaLabel: 'Transcription model',
    accuracySuffix: 'accuracy',
    loadSuffix: 'load',
    options: {
      ant: {
        name: 'Ant Model',
        speed: 'Shortest loading',
        accuracy: 'Lowest accuracy',
        description: 'Shortest loading time and the lowest accuracy tier.'
      },
      fox: {
        name: 'Fox Model',
        speed: 'Balanced loading',
        accuracy: 'Medium accuracy',
        description: 'Balanced loading time with a medium accuracy tier.'
      },
      tiger: {
        name: 'Tiger Model',
        speed: 'Longer loading',
        accuracy: 'High accuracy',
        description: 'Longer loading time with a high accuracy tier.'
      },
      'blue-whale': {
        name: 'Whale Model',
        speed: 'Longest loading',
        accuracy: 'Highest accuracy',
        description: 'Longest loading time and the highest accuracy tier.'
      }
    }
  },
  language: {
    eyebrow: 'Language',
    title: 'Select language',
    ariaLabel: 'Transcription language',
    options: {
      auto: {
        label: 'Auto Detect',
        description: 'Let the model infer the spoken language.'
      },
      english: { label: 'English', description: 'English speech.' },
      'zh-hans': {
        label: 'Chinese (Simplified)',
        description: 'Chinese speech. The app normalizes output to Simplified Chinese.'
      },
      'zh-hant': {
        label: 'Chinese (Traditional)',
        description: 'Chinese speech. The app normalizes output to Traditional Chinese.'
      },
      japanese: { label: 'Japanese', description: 'Japanese speech.' },
      korean: { label: 'Korean', description: 'Korean speech.' },
      spanish: { label: 'Spanish', description: 'Spanish speech.' },
      french: { label: 'French', description: 'French speech.' },
      german: { label: 'German', description: 'German speech.' }
    }
  },
  progress: {
    eyebrow: 'Progress',
    title: 'Progress',
    ariaLabel: 'Transcription progress',
    defaultMessage: 'Choose a file and start transcription.',
    estimatedRemaining: (minutes) => `Estimated: about ${minutes} min left`,
    estimatedLessThanMinute: 'Estimated: less than 1 min left',
    estimateMayVary: 'Processing may take longer than estimated.',
    labels: {
      complete: 'Complete',
      loadingModel: 'Loading model...',
      transcribing: 'Transcribing...',
      stopped: 'Stopped',
      ready: 'Ready'
    }
  },
  preview: {
    eyebrow: 'Live transcript preview',
    title: 'Transcript preview',
    placeholder: 'Your transcript will appear here.',
    ariaLabel: 'Transcript preview',
    timestampedAriaLabel: 'Timestamped transcript preview',
    emptyDescription: 'Preview appears here after transcription.',
    segmentDescription: (count) =>
      `${count} subtitle segment${count === 1 ? '' : 's'} available.`
  },
  export: {
    eyebrow: 'Export transcript',
    ariaLabel: 'Download transcript files',
    formats: {
      txt: 'Plain text for notes, search, summaries, and copywriting.',
      srt: 'Subtitles for CapCut, Premiere Pro, DaVinci Resolve, YouTube, and most editors.',
      vtt: 'WebVTT captions for websites, online video players, and HTML video.',
      lrc: 'Timed lyric lines for music players, lyric videos, and karaoke-style workflows.'
    }
  }
};

export const homeUiCopy: Record<UiLanguageCode, HomeUiCopy> = {
  english,
  'zh-hans': {
    ...english,
    browserTitle: '免费 AI 音频转文字、字幕与歌词工具',
    tool: {
      ...english.tool,
      title: '免费 AI 音视频转文字、字幕与歌词工具',
      subtitle: '在浏览器中使用 AI 将音频或视频转成文字、字幕和歌词文件 - 无需注册、安装或配置，时长不限。',
      ariaLabel: '免费 AI 转写工具',
      steps: [
        { title: '上传', description: '添加音频或视频文件' },
        { title: '转写', description: 'AI 将语音转换为文字' },
        { title: '导出', description: '下载转写文本或字幕' }
      ],
      actions: { start: '开始转写', cancel: '取消' },
      messages: {
        chooseFile: '请先选择支持的音频或视频文件。',
        fileReady: '文件已准备好。选择设置后即可开始转写。',
        workerFailed: '转写进程启动失败。请刷新页面或使用较新的浏览器。',
        fileTransferFailed: '浏览器无法把所选文件传递给转写进程。',
        preparingText: '正在整理转写文本。',
        complete: '转写完成。请预览文本并导出文件。',
        stopped: '转写已停止。',
        decoding: '正在浏览器本地解码所选文件。',
        preparingModel: (modelName) =>
          `正在加载 ${modelName} 用于浏览器本地转写，这可能需要一些时间，请耐心等待。`,
        workerStartupTimeout: '转写进程未能在 30 秒内启动。请刷新页面后重试。',
        modelStalled: '模型已连续两分钟没有响应。请检查模型文件或网络后重试。',
        workerErrors: {
          'model-files': '一个或多个 AI 模型文件无法读取。请检查本地模型文件后重试。',
          'model-init': '模型文件已读取，但浏览器无法初始化模型。请尝试蚂蚁模型或更换浏览器。',
          network: '浏览器无法获取模型文件。请检查网络后重试。',
          memory: '浏览器内存不足。请尝试更小的模型或关闭其他标签页。',
          normalization: '转写已经完成，但简繁转换失败。请重试。',
          unknown: '转写失败。请尝试其他模型或文件。'
        },
        cancelled: '转写已取消。'
      },
      notices: {
        local: '你的文件会在浏览器本地处理，不会上传到我们的服务器。',
        firstUse: '加载 AI 模型和转写文件需要一定时间。如果进度条暂时没有变化，说明系统仍在处理中，请耐心等待。'
      }
    },
    upload: {
      eyebrow: '上传',
      title: '上传音频或视频',
      dragDrop: '将音频或视频文件拖放到这里',
      browse: '或点击选择文件',
      formats: 'MP3、WAV、M4A、MP4、MOV、MKV 和 WebM',
      removeFile: '移除文件',
      fileCategories: { audio: '音频', video: '视频', unknown: '未知' }
    },
    model: {
      eyebrow: '模型',
      title: '选择模型',
      ariaLabel: '转写模型',
      accuracySuffix: '准确性',
      loadSuffix: '负载',
      options: {
        ant: { name: '蚂蚁模型', speed: '加载最短', accuracy: '准确率低', description: '加载等待最短，准确率等级最低。' },
        fox: { name: '狐狸模型', speed: '平衡加载', accuracy: '准确率中', description: '加载时间和准确率都处于中间档。' },
        tiger: { name: '老虎模型', speed: '加载较久', accuracy: '准确率高', description: '加载时间更久，准确率等级更高。' },
        'blue-whale': { name: '鲸鱼模型', speed: '加载最久', accuracy: '准确率最高', description: '加载等待最长，准确率等级最高。' }
      }
    },
    language: {
      eyebrow: '语言',
      title: '选择语言',
      ariaLabel: '转写语言',
      options: {
        auto: { label: '自动识别', description: '让模型自动判断语音语言。' },
        english: { label: '英语', description: '英语语音。' },
        'zh-hans': { label: '中文（简体）', description: '中文语音，输出统一为简体中文。' },
        'zh-hant': { label: '中文（繁体）', description: '中文语音，输出统一为繁体中文。' },
        japanese: { label: '日语', description: '日语语音。' },
        korean: { label: '韩语', description: '韩语语音。' },
        spanish: { label: '西班牙语', description: '西班牙语语音。' },
        french: { label: '法语', description: '法语语音。' },
        german: { label: '德语', description: '德语语音。' }
      }
    },
    progress: {
      eyebrow: '进度',
      title: '进度',
      ariaLabel: '转写进度',
      defaultMessage: '选择文件后开始转写。',
      estimatedRemaining: (minutes) => `预计还需约 ${minutes} 分钟`,
      estimatedLessThanMinute: '预计少于 1 分钟',
      estimateMayVary: '实际处理时间可能比预计更长。',
      labels: { complete: '完成', loadingModel: '正在加载模型...', transcribing: '正在转写...', stopped: '已停止', ready: '准备就绪' }
    },
    preview: {
      eyebrow: '实时转写预览',
      title: '转写预览',
      placeholder: '转写结果会显示在这里。',
      ariaLabel: '转写预览',
      timestampedAriaLabel: '带时间戳的转写预览',
      emptyDescription: '转写后会在这里显示预览。',
      segmentDescription: (count) => `已生成 ${count} 个字幕片段。`
    },
    export: {
      eyebrow: '导出文件',
      ariaLabel: '下载转写文件',
      formats: {
        txt: '纯文本，适合整理笔记、搜索内容、总结和复制编辑。',
        srt: '字幕文件，适合剪映、CapCut、Premiere Pro、达芬奇、YouTube 等剪辑平台。',
        vtt: 'WebVTT 字幕，适合网页播放器、在线视频和 HTML video。',
        lrc: '歌词时间轴，适合音乐播放器、歌词视频和卡拉 OK 风格内容。'
      }
    }
  },
  'zh-hant': {
    ...english,
    browserTitle: '免費 AI 音訊轉文字、字幕與歌詞工具',
    tool: {
      ...english.tool,
      title: '免費 AI 音影片轉文字、字幕與歌詞工具',
      subtitle: '在瀏覽器中使用 AI 將音訊或影片轉成文字、字幕和歌詞檔案 - 無需註冊、安裝或設定，時長不限。',
      ariaLabel: '免費 AI 轉寫工具',
      steps: [
        { title: '上傳', description: '加入音訊或影片檔案' },
        { title: '轉寫', description: 'AI 將語音轉換為文字' },
        { title: '匯出', description: '下載轉寫文字或字幕' }
      ],
      actions: { start: '開始轉寫', cancel: '取消' },
      messages: {
        chooseFile: '請先選擇支援的音訊或影片檔案。',
        fileReady: '檔案已準備好。選擇設定後即可開始轉寫。',
        workerFailed: '轉寫程序啟動失敗。請重新整理頁面或使用較新的瀏覽器。',
        fileTransferFailed: '瀏覽器無法把所選檔案傳遞給轉寫程序。',
        preparingText: '正在整理轉寫文字。',
        complete: '轉寫完成。請預覽文字並匯出檔案。',
        stopped: '轉寫已停止。',
        decoding: '正在瀏覽器本地解碼所選檔案。',
        preparingModel: (modelName) => `正在載入 ${modelName} 用於瀏覽器本地轉寫，這可能需要一些時間，請耐心等待。`,
        workerStartupTimeout: '轉寫程序未能在 30 秒內啟動。請重新整理頁面後再試。',
        modelStalled: '模型已連續兩分鐘沒有回應。請檢查模型檔案或網路後再試。',
        workerErrors: {
          'model-files': '一個或多個 AI 模型檔案無法讀取。請檢查本機模型檔案後再試。',
          'model-init': '模型檔案已讀取，但瀏覽器無法初始化模型。請嘗試螞蟻模型或更換瀏覽器。',
          network: '瀏覽器無法取得模型檔案。請檢查網路後再試。',
          memory: '瀏覽器記憶體不足。請嘗試較小的模型或關閉其他分頁。',
          normalization: '轉寫已完成，但簡繁轉換失敗。請再試一次。',
          unknown: '轉寫失敗。請嘗試其他模型或檔案。'
        },
        cancelled: '轉寫已取消。'
      },
      notices: {
        local: '你的檔案會在瀏覽器本地處理，不會上傳到我們的伺服器。',
        firstUse: '載入 AI 模型和轉寫檔案需要一定時間。如果進度條暫時沒有變化，表示系統仍在處理中，請耐心等待。'
      }
    },
    upload: {
      eyebrow: '上傳',
      title: '上傳音訊或影片',
      dragDrop: '將音訊或影片檔案拖放到這裡',
      browse: '或點擊選擇檔案',
      formats: 'MP3、WAV、M4A、MP4、MOV、MKV 和 WebM',
      removeFile: '移除檔案',
      fileCategories: { audio: '音訊', video: '影片', unknown: '未知' }
    },
    model: {
      eyebrow: '模型',
      title: '選擇模型',
      ariaLabel: '轉寫模型',
      accuracySuffix: '準確性',
      loadSuffix: '負載',
      options: {
        ant: { name: '螞蟻模型', speed: '載入最短', accuracy: '準確率低', description: '載入等待最短，準確率等級最低。' },
        fox: { name: '狐狸模型', speed: '平衡載入', accuracy: '準確率中', description: '載入時間和準確率都處於中間檔。' },
        tiger: { name: '老虎模型', speed: '載入較久', accuracy: '準確率高', description: '載入時間更久，準確率等級更高。' },
        'blue-whale': { name: '鯨魚模型', speed: '載入最久', accuracy: '準確率最高', description: '載入等待最長，準確率等級最高。' }
      }
    },
    language: {
      eyebrow: '語言',
      title: '選擇語言',
      ariaLabel: '轉寫語言',
      options: {
        auto: { label: '自動偵測', description: '讓模型自動判斷語音語言。' },
        english: { label: '英文', description: '英文語音。' },
        'zh-hans': { label: '中文（簡體）', description: '中文語音，輸出統一為簡體中文。' },
        'zh-hant': { label: '中文（繁體）', description: '中文語音，輸出統一為繁體中文。' },
        japanese: { label: '日文', description: '日文語音。' },
        korean: { label: '韓文', description: '韓文語音。' },
        spanish: { label: '西班牙文', description: '西班牙文語音。' },
        french: { label: '法文', description: '法文語音。' },
        german: { label: '德文', description: '德文語音。' }
      }
    },
    progress: {
      eyebrow: '進度',
      title: '進度',
      ariaLabel: '轉寫進度',
      defaultMessage: '選擇檔案後開始轉寫。',
      estimatedRemaining: (minutes) => `預計還需約 ${minutes} 分鐘`,
      estimatedLessThanMinute: '預計少於 1 分鐘',
      estimateMayVary: '實際處理時間可能比預計更長。',
      labels: { complete: '完成', loadingModel: '正在載入模型...', transcribing: '正在轉寫...', stopped: '已停止', ready: '準備就緒' }
    },
    preview: {
      eyebrow: '即時轉寫預覽',
      title: '轉寫預覽',
      placeholder: '轉寫結果會顯示在這裡。',
      ariaLabel: '轉寫預覽',
      timestampedAriaLabel: '帶時間戳的轉寫預覽',
      emptyDescription: '轉寫後會在這裡顯示預覽。',
      segmentDescription: (count) => `已生成 ${count} 個字幕片段。`
    },
    export: {
      eyebrow: '匯出檔案',
      ariaLabel: '下載轉寫檔案',
      formats: {
        txt: '純文字，適合整理筆記、搜尋內容、摘要和複製編輯。',
        srt: '字幕檔案，適合剪映、CapCut、Premiere Pro、達芬奇、YouTube 等剪輯平台。',
        vtt: 'WebVTT 字幕，適合網頁播放器、線上影片和 HTML video。',
        lrc: '歌詞時間軸，適合音樂播放器、歌詞影片和卡拉 OK 風格內容。'
      }
    }
  },
  japanese: {
    ...english,
    browserTitle: '無料 AI 音声文字起こし・字幕・歌詞ツール',
    tool: {
      ...english.tool,
      title: '無料 AI 音声・動画を文字、字幕、歌詞に変換するツール',
      subtitle:
        'ブラウザで AI を使い、音声や動画をテキスト、字幕、タイム付き歌詞に変換 - 登録、インストール、設定、固定の時間制限は不要。',
      ariaLabel: '無料 AI 文字起こしツール',
      steps: [
        { title: 'アップロード', description: '音声または動画ファイルを追加' },
        { title: '文字起こし', description: 'AI が音声をテキスト化' },
        { title: '書き出し', description: '文字起こしをダウンロード' }
      ],
      actions: { start: '文字起こしを開始', cancel: 'キャンセル' },
      messages: {
        chooseFile: '対応している音声または動画ファイルを先に選択してください。',
        fileReady: 'ファイルの準備ができました。設定を選んで開始してください。',
        workerFailed: '文字起こしワーカーを開始できませんでした。ページを再読み込みするか、新しいブラウザを使用してください。',
        fileTransferFailed: '選択したファイルを文字起こしワーカーに渡せませんでした。',
        preparingText: '文字起こしテキストを準備しています。',
        complete: '文字起こしが完了しました。内容を確認して書き出してください。',
        stopped: '文字起こしは停止しました。',
        decoding: '選択したファイルをブラウザ内でデコードしています。',
        preparingModel: (modelName) => `${modelName} をブラウザ内文字起こし用に読み込んでいます。少し時間がかかる場合がありますので、そのままお待ちください。`,
        workerStartupTimeout: '文字起こしワーカーが 30 秒以内に起動しませんでした。ページを再読み込みしてください。',
        modelStalled: 'モデルから 2 分間応答がありません。モデルファイルまたは接続を確認してください。',
        workerErrors: {
          'model-files': '一部の AI モデルファイルを読み込めませんでした。ローカルモデルを確認してください。',
          'model-init': 'モデルファイルは読み込めましたが、ブラウザーで初期化できませんでした。Ant Model または別のブラウザーをお試しください。',
          network: 'モデルファイルを取得できませんでした。ネットワーク接続を確認してください。',
          memory: 'ブラウザーのメモリが不足しました。小さいモデルを使用するか、他のタブを閉じてください。',
          normalization: '文字起こしは完了しましたが、中国語の字体変換に失敗しました。もう一度お試しください。',
          unknown: '文字起こしに失敗しました。別のモデルまたはファイルをお試しください。'
        },
        cancelled: '文字起こしをキャンセルしました。'
      },
      notices: {
        local: 'ファイルはブラウザ内でローカル処理され、サーバーにはアップロードされません。',
        firstUse: 'AI モデルの読み込みと文字起こしには時間がかかる場合があります。進行状況がしばらく変わらなくても処理中ですので、しばらくお待ちください。'
      }
    },
    upload: {
      eyebrow: 'アップロード',
      title: '音声または動画をアップロード',
      dragDrop: '音声または動画ファイルをここにドラッグ',
      browse: 'またはクリックして選択',
      formats: 'MP3、WAV、M4A、MP4、MOV、MKV、WebM',
      removeFile: 'ファイルを削除',
      fileCategories: { audio: '音声', video: '動画', unknown: '不明' }
    },
    model: {
      ...english.model,
      eyebrow: 'モデル',
      title: 'モデルを選択',
      ariaLabel: '文字起こしモデル',
      accuracySuffix: '精度',
      loadSuffix: '負荷',
      options: {
        ant: { name: 'Ant Model', speed: '読み込み最短', accuracy: '精度 低', description: '読み込み待ちが最短で、精度レベルは最も低めです。' },
        fox: { name: 'Fox Model', speed: '中程度の読み込み', accuracy: '精度 中', description: '読み込み時間と精度の中間レベルです。' },
        tiger: { name: 'Tiger Model', speed: '読み込み長め', accuracy: '精度 高', description: '読み込み時間は長めで、精度レベルは高めです。' },
        'blue-whale': { name: 'Whale Model', speed: '読み込み最長', accuracy: '精度 最高', description: '読み込み待ちが最長で、精度レベルは最も高めです。' }
      }
    },
    language: {
      ...english.language,
      eyebrow: '言語',
      title: '言語を選択',
      ariaLabel: '文字起こし言語',
      options: {
        auto: { label: '自動検出', description: '話されている言語をモデルに推定させます。' },
        english: { label: '英語', description: '英語の音声。' },
        'zh-hans': { label: '中国語（簡体字）', description: '中国語音声。出力を簡体字中国語に統一します。' },
        'zh-hant': { label: '中国語（繁体字）', description: '中国語音声。出力を繁体字中国語に統一します。' },
        japanese: { label: '日本語', description: '日本語の音声。' },
        korean: { label: '韓国語', description: '韓国語の音声。' },
        spanish: { label: 'スペイン語', description: 'スペイン語の音声。' },
        french: { label: 'フランス語', description: 'フランス語の音声。' },
        german: { label: 'ドイツ語', description: 'ドイツ語の音声。' }
      }
    },
    progress: {
      eyebrow: '進行状況',
      title: '進行状況',
      ariaLabel: '文字起こしの進行状況',
      defaultMessage: 'ファイルを選択して文字起こしを開始してください。',
      estimatedRemaining: (minutes) => `あと約 ${minutes} 分（目安）`,
      estimatedLessThanMinute: '1分未満の見込み',
      estimateMayVary: '実際の処理時間は見積もりより長くなる場合があります。',
      labels: { complete: '完了', loadingModel: 'モデルを読み込み中...', transcribing: '文字起こし中...', stopped: '停止', ready: '準備完了' }
    },
    preview: {
      eyebrow: 'ライブプレビュー',
      title: '文字起こしプレビュー',
      placeholder: '文字起こし結果がここに表示されます。',
      ariaLabel: '文字起こしプレビュー',
      timestampedAriaLabel: 'タイムスタンプ付き文字起こしプレビュー',
      emptyDescription: '文字起こし後にここへプレビューが表示されます。',
      segmentDescription: (count) => `${count} 個の字幕セグメントがあります。`
    },
    export: {
      eyebrow: 'ファイルを書き出し',
      ariaLabel: '文字起こしファイルをダウンロード',
      formats: {
        txt: 'メモ、検索、要約、コピー編集に使いやすいプレーンテキスト。',
        srt: 'CapCut、Premiere Pro、DaVinci Resolve、YouTube などで使える字幕ファイル。',
        vtt: 'Web サイト、オンライン動画プレイヤー、HTML video 向けの WebVTT 字幕。',
        lrc: '音楽プレイヤー、歌詞動画、カラオケ風ワークフロー向けのタイム付き歌詞。'
      }
    }
  },
  korean: {
    ...english,
    browserTitle: '무료 AI 오디오 텍스트·자막·가사 변환 도구',
    tool: {
      ...english.tool,
      title: '무료 AI 오디오·비디오 텍스트, 자막, 가사 변환 도구',
      subtitle:
        '브라우저에서 AI로 오디오나 비디오를 텍스트, 자막, 시간 동기화 가사로 변환하세요 - 가입, 설치, 설정, 고정된 시간 제한이 필요 없습니다.',
      ariaLabel: '무료 AI 전사 도구',
      steps: [
        { title: '업로드', description: '오디오 또는 비디오 파일 추가' },
        { title: '전사', description: 'AI가 음성을 텍스트로 변환' },
        { title: '내보내기', description: '전사 결과 다운로드' }
      ],
      actions: { start: '전사 시작', cancel: '취소' },
      messages: {
        chooseFile: '지원되는 오디오 또는 비디오 파일을 먼저 선택하세요.',
        fileReady: '파일이 준비되었습니다. 설정을 선택하고 전사를 시작하세요.',
        workerFailed: '전사 워커를 시작하지 못했습니다. 페이지를 새로고침하거나 최신 브라우저를 사용하세요.',
        fileTransferFailed: '브라우저가 선택한 파일을 전사 워커로 전달하지 못했습니다.',
        preparingText: '전사 텍스트를 준비하는 중입니다.',
        complete: '전사가 완료되었습니다. 텍스트를 확인하고 파일을 내보내세요.',
        stopped: '전사가 중지되었습니다.',
        decoding: '선택한 파일을 브라우저에서 로컬로 디코딩하는 중입니다.',
        preparingModel: (modelName) => `${modelName}을 브라우저 로컬 전사용으로 불러오는 중입니다. 시간이 걸릴 수 있으니 잠시 기다려 주세요.`,
        workerStartupTimeout: '전사 워커가 30초 안에 시작되지 않았습니다. 페이지를 새로고침해 주세요.',
        modelStalled: '모델이 2분 동안 응답하지 않았습니다. 모델 파일이나 연결을 확인해 주세요.',
        workerErrors: {
          'model-files': '일부 AI 모델 파일을 읽을 수 없습니다. 로컬 모델 파일을 확인해 주세요.',
          'model-init': '모델 파일은 로드됐지만 브라우저에서 초기화할 수 없습니다. Ant Model 또는 다른 브라우저를 사용해 주세요.',
          network: '모델 파일을 가져올 수 없습니다. 네트워크 연결을 확인해 주세요.',
          memory: '브라우저 메모리가 부족합니다. 더 작은 모델을 사용하거나 다른 탭을 닫아 주세요.',
          normalization: '전사는 완료됐지만 중국어 문자 변환을 마치지 못했습니다. 다시 시도해 주세요.',
          unknown: '전사에 실패했습니다. 다른 모델이나 파일을 사용해 주세요.'
        },
        cancelled: '전사가 취소되었습니다.'
      },
      notices: {
        local: '파일은 브라우저에서 로컬로 처리되며 서버에 업로드되지 않습니다.',
        firstUse: 'AI 모델을 불러오고 파일을 변환하는 데 시간이 걸릴 수 있습니다. 진행률이 잠시 바뀌지 않아도 처리 중이므로 기다려 주세요.'
      }
    },
    upload: {
      eyebrow: '업로드',
      title: '오디오 또는 비디오 업로드',
      dragDrop: '오디오 또는 비디오 파일을 여기에 끌어다 놓으세요',
      browse: '또는 클릭하여 선택',
      formats: 'MP3, WAV, M4A, MP4, MOV, MKV, WebM',
      removeFile: '파일 제거',
      fileCategories: { audio: '오디오', video: '비디오', unknown: '알 수 없음' }
    },
    model: {
      ...english.model,
      eyebrow: '모델',
      title: '모델 선택',
      ariaLabel: '전사 모델',
      accuracySuffix: '정확도',
      loadSuffix: '부하',
      options: {
        ant: { name: 'Ant Model', speed: '가장 짧은 로딩', accuracy: '정확도 낮음', description: '로딩 대기가 가장 짧고 정확도 단계는 가장 낮습니다.' },
        fox: { name: 'Fox Model', speed: '중간 로딩', accuracy: '정확도 보통', description: '로딩 시간과 정확도가 중간 단계입니다.' },
        tiger: { name: 'Tiger Model', speed: '더 긴 로딩', accuracy: '정확도 높음', description: '로딩 시간은 더 길고 정확도 단계는 높습니다.' },
        'blue-whale': { name: 'Whale Model', speed: '가장 긴 로딩', accuracy: '정확도 최고', description: '로딩 대기가 가장 길고 정확도 단계는 가장 높습니다.' }
      }
    },
    language: {
      ...english.language,
      eyebrow: '언어',
      title: '언어 선택',
      ariaLabel: '전사 언어',
      options: {
        auto: { label: '자동 감지', description: '모델이 음성 언어를 추정합니다.' },
        english: { label: '영어', description: '영어 음성.' },
        'zh-hans': { label: '중국어(간체)', description: '중국어 음성. 출력을 중국어 간체로 통일합니다.' },
        'zh-hant': { label: '중국어(번체)', description: '중국어 음성. 출력을 중국어 번체로 통일합니다.' },
        japanese: { label: '일본어', description: '일본어 음성.' },
        korean: { label: '한국어', description: '한국어 음성.' },
        spanish: { label: '스페인어', description: '스페인어 음성.' },
        french: { label: '프랑스어', description: '프랑스어 음성.' },
        german: { label: '독일어', description: '독일어 음성.' }
      }
    },
    progress: {
      eyebrow: '진행률',
      title: '진행률',
      ariaLabel: '전사 진행률',
      defaultMessage: '파일을 선택하고 전사를 시작하세요.',
      estimatedRemaining: (minutes) => `약 ${minutes}분 남음 (예상)`,
      estimatedLessThanMinute: '1분 미만 남음 (예상)',
      estimateMayVary: '실제 처리 시간은 예상보다 길어질 수 있습니다.',
      labels: { complete: '완료', loadingModel: '모델 로딩 중...', transcribing: '전사 중...', stopped: '중지됨', ready: '준비됨' }
    },
    preview: {
      eyebrow: '실시간 전사 미리보기',
      title: '전사 미리보기',
      placeholder: '전사 결과가 여기에 표시됩니다.',
      ariaLabel: '전사 미리보기',
      timestampedAriaLabel: '타임스탬프가 있는 전사 미리보기',
      emptyDescription: '전사 후 여기에 미리보기가 표시됩니다.',
      segmentDescription: (count) => `${count}개의 자막 세그먼트가 있습니다.`
    },
    export: {
      eyebrow: '파일 내보내기',
      ariaLabel: '전사 파일 다운로드',
      formats: {
        txt: '노트 정리, 검색, 요약, 복사 편집에 적합한 일반 텍스트.',
        srt: 'CapCut, Premiere Pro, DaVinci Resolve, YouTube 등 편집 도구용 자막 파일.',
        vtt: '웹사이트, 온라인 비디오 플레이어, HTML video용 WebVTT 자막.',
        lrc: '음악 플레이어, 가사 영상, 노래방 스타일 작업용 시간 동기화 가사.'
      }
    }
  },
  spanish: {
    ...english,
    browserTitle: 'Transcriptor de audio, subtítulos y letras con IA gratis',
    tool: {
      ...english.tool,
      title: 'Herramienta gratis de IA para texto, subtítulos y letras',
      subtitle:
        'Usa IA para convertir audio o video en texto, subtítulos y letras sincronizadas en tu navegador - sin registro, instalación, configuración ni límite de duración fijo.',
      ariaLabel: 'Herramienta gratuita de transcripción con IA',
      steps: [
        { title: 'Subir', description: 'Añade tu archivo de audio o video' },
        { title: 'Transcribir', description: 'La IA convierte voz en texto' },
        { title: 'Exportar', description: 'Descarga tu transcripción' }
      ],
      actions: { start: 'Iniciar transcripción', cancel: 'Cancelar' },
      messages: {
        chooseFile: 'Elige primero un archivo de audio o video compatible.',
        fileReady: 'Archivo listo. Elige la configuración e inicia la transcripción.',
        workerFailed: 'No se pudo iniciar el proceso de transcripción. Actualiza la página o usa un navegador más reciente.',
        fileTransferFailed: 'El navegador no pudo pasar el archivo seleccionado al proceso de transcripción.',
        preparingText: 'Preparando el texto de la transcripción.',
        complete: 'Transcripción completa. Revisa el texto y exporta tus archivos.',
        stopped: 'Transcripción detenida.',
        decoding: 'Decodificando el archivo seleccionado localmente en tu navegador.',
        preparingModel: (modelName) => `Cargando ${modelName} para la transcripción local en el navegador. Puede tardar un poco, espera por favor.`,
        workerStartupTimeout: 'El proceso de transcripción no se inició en 30 segundos. Actualiza la página.',
        modelStalled: 'El modelo no respondió durante dos minutos. Revisa los archivos del modelo o la conexión.',
        workerErrors: {
          'model-files': 'No se pudieron leer uno o más archivos del modelo de IA. Revisa los modelos locales.',
          'model-init': 'Los archivos se cargaron, pero el navegador no pudo iniciar el modelo. Prueba Ant Model u otro navegador.',
          network: 'El navegador no pudo obtener los archivos del modelo. Revisa tu conexión.',
          memory: 'El navegador se quedó sin memoria. Prueba un modelo más pequeño o cierra otras pestañas.',
          normalization: 'La transcripción terminó, pero no se pudo convertir la escritura china. Inténtalo de nuevo.',
          unknown: 'La transcripción falló. Prueba otro modelo o archivo.'
        },
        cancelled: 'Transcripción cancelada.'
      },
      notices: {
        local: 'Tu archivo se procesa localmente en tu navegador y no se sube a nuestro servidor.',
        firstUse: 'Cargar el modelo de IA y transcribir el archivo puede tardar un poco. Si la barra no cambia durante un momento, el proceso continúa. Espera por favor.'
      }
    },
    upload: {
      eyebrow: 'Subir',
      title: 'Sube audio o video',
      dragDrop: 'Arrastra aquí un archivo de audio o video',
      browse: 'o haz clic para buscar',
      formats: 'MP3, WAV, M4A, MP4, MOV, MKV y WebM',
      removeFile: 'Eliminar archivo',
      fileCategories: { audio: 'audio', video: 'video', unknown: 'desconocido' }
    },
    model: {
      ...english.model,
      eyebrow: 'Modelo',
      title: 'Elige un modelo',
      ariaLabel: 'Modelo de transcripción',
      accuracySuffix: 'precisión',
      loadSuffix: 'carga',
      options: {
        ant: { name: 'Ant Model', speed: 'Carga más corta', accuracy: 'Precisión baja', description: 'Menor espera de carga y el nivel de precisión más bajo.' },
        fox: { name: 'Fox Model', speed: 'Carga media', accuracy: 'Precisión media', description: 'Nivel medio de carga y precisión.' },
        tiger: { name: 'Tiger Model', speed: 'Carga más larga', accuracy: 'Precisión alta', description: 'Más espera de carga y un nivel de precisión alto.' },
        'blue-whale': { name: 'Whale Model', speed: 'Carga más larga', accuracy: 'Precisión máxima', description: 'Mayor espera de carga y el nivel de precisión más alto.' }
      }
    },
    language: {
      ...english.language,
      eyebrow: 'Idioma',
      title: 'Selecciona idioma',
      ariaLabel: 'Idioma de transcripción',
      options: {
        auto: { label: 'Detección automática', description: 'Deja que el modelo infiera el idioma hablado.' },
        english: { label: 'Inglés', description: 'Voz en inglés.' },
        'zh-hans': { label: 'Chino (simplificado)', description: 'Voz en chino. La salida se normaliza a chino simplificado.' },
        'zh-hant': { label: 'Chino (tradicional)', description: 'Voz en chino. La salida se normaliza a chino tradicional.' },
        japanese: { label: 'Japonés', description: 'Voz en japonés.' },
        korean: { label: 'Coreano', description: 'Voz en coreano.' },
        spanish: { label: 'Español', description: 'Voz en español.' },
        french: { label: 'Francés', description: 'Voz en francés.' },
        german: { label: 'Alemán', description: 'Voz en alemán.' }
      }
    },
    progress: {
      eyebrow: 'Progreso',
      title: 'Progreso',
      ariaLabel: 'Progreso de transcripción',
      defaultMessage: 'Elige un archivo e inicia la transcripción.',
      estimatedRemaining: (minutes) => `Quedan unos ${minutes} min (estimado)`,
      estimatedLessThanMinute: 'Queda menos de 1 min (estimado)',
      estimateMayVary: 'El procesamiento puede tardar más de lo estimado.',
      labels: { complete: 'Completo', loadingModel: 'Cargando modelo...', transcribing: 'Transcribiendo...', stopped: 'Detenido', ready: 'Listo' }
    },
    preview: {
      eyebrow: 'Vista previa en vivo',
      title: 'Vista previa de transcripción',
      placeholder: 'Tu transcripción aparecerá aquí.',
      ariaLabel: 'Vista previa de transcripción',
      timestampedAriaLabel: 'Vista previa con marcas de tiempo',
      emptyDescription: 'La vista previa aparece aquí después de transcribir.',
      segmentDescription: (count) => `${count} segmento${count === 1 ? '' : 's'} de subtítulos disponible${count === 1 ? '' : 's'}.`
    },
    export: {
      eyebrow: 'Exportar archivos',
      ariaLabel: 'Descargar archivos de transcripción',
      formats: {
        txt: 'Texto simple para notas, búsqueda, resúmenes y edición.',
        srt: 'Subtítulos para CapCut, Premiere Pro, DaVinci Resolve, YouTube y otros editores.',
        vtt: 'Subtítulos WebVTT para sitios web, reproductores online y HTML video.',
        lrc: 'Letras sincronizadas para reproductores de música, videos de letras y karaoke.'
      }
    }
  },
  french: {
    ...english,
    browserTitle: 'Outil IA gratuit de transcription audio, sous-titres et paroles',
    tool: {
      ...english.tool,
      title: 'Outil IA gratuit pour texte, sous-titres et paroles',
      subtitle:
        'Utilisez l IA pour convertir audio ou vidéo en texte, sous-titres et paroles synchronisées dans votre navigateur - sans inscription, installation, configuration ni limite de durée fixe.',
      ariaLabel: 'Outil gratuit de transcription IA',
      steps: [
        { title: 'Importer', description: 'Ajoutez votre fichier audio ou vidéo' },
        { title: 'Transcrire', description: 'L IA transforme la parole en texte' },
        { title: 'Exporter', description: 'Téléchargez votre transcription' }
      ],
      actions: { start: 'Démarrer la transcription', cancel: 'Annuler' },
      messages: {
        chooseFile: 'Choisissez d abord un fichier audio ou vidéo compatible.',
        fileReady: 'Fichier prêt. Choisissez les réglages et démarrez la transcription.',
        workerFailed: 'Le processus de transcription n a pas pu démarrer. Actualisez la page ou utilisez un navigateur plus récent.',
        fileTransferFailed: 'Le navigateur n a pas pu transmettre le fichier sélectionné au processus de transcription.',
        preparingText: 'Préparation du texte de transcription.',
        complete: 'Transcription terminée. Vérifiez le texte et exportez vos fichiers.',
        stopped: 'Transcription arrêtée.',
        decoding: 'Décodage local du fichier sélectionné dans votre navigateur.',
        preparingModel: (modelName) => `Chargement de ${modelName} pour la transcription locale dans le navigateur. Cela peut prendre un peu de temps, merci de patienter.`,
        workerStartupTimeout: 'Le processus de transcription n a pas démarré sous 30 secondes. Actualisez la page.',
        modelStalled: 'Le modèle n a pas répondu pendant deux minutes. Vérifiez les fichiers du modèle ou la connexion.',
        workerErrors: {
          'model-files': 'Un ou plusieurs fichiers du modèle IA sont illisibles. Vérifiez les modèles locaux.',
          'model-init': 'Les fichiers sont chargés, mais le navigateur ne peut pas initialiser le modèle. Essayez Ant Model ou un autre navigateur.',
          network: 'Le navigateur ne peut pas récupérer les fichiers du modèle. Vérifiez votre connexion.',
          memory: 'Le navigateur manque de mémoire. Essayez un modèle plus petit ou fermez d autres onglets.',
          normalization: 'La transcription est terminée, mais la conversion des caractères chinois a échoué. Réessayez.',
          unknown: 'La transcription a échoué. Essayez un autre modèle ou fichier.'
        },
        cancelled: 'Transcription annulée.'
      },
      notices: {
        local: 'Votre fichier est traité localement dans votre navigateur et n est pas envoyé à notre serveur.',
        firstUse: 'Le chargement du modèle IA et la transcription peuvent prendre un peu de temps. Si la barre ne bouge pas pendant un moment, le traitement continue. Merci de patienter.'
      }
    },
    upload: {
      eyebrow: 'Importer',
      title: 'Importer audio ou vidéo',
      dragDrop: 'Glissez-déposez un fichier audio ou vidéo ici',
      browse: 'ou cliquez pour parcourir',
      formats: 'MP3, WAV, M4A, MP4, MOV, MKV et WebM',
      removeFile: 'Supprimer le fichier',
      fileCategories: { audio: 'audio', video: 'vidéo', unknown: 'inconnu' }
    },
    model: {
      ...english.model,
      eyebrow: 'Modèle',
      title: 'Choisir un modèle',
      ariaLabel: 'Modèle de transcription',
      accuracySuffix: 'précision',
      loadSuffix: 'charge',
      options: {
        ant: { name: 'Ant Model', speed: 'Chargement le plus court', accuracy: 'Précision faible', description: 'Attente la plus courte et niveau de précision le plus bas.' },
        fox: { name: 'Fox Model', speed: 'Chargement moyen', accuracy: 'Précision moyenne', description: 'Niveau intermédiaire de chargement et de précision.' },
        tiger: { name: 'Tiger Model', speed: 'Chargement plus long', accuracy: 'Précision élevée', description: 'Chargement plus long avec un niveau de précision élevé.' },
        'blue-whale': { name: 'Whale Model', speed: 'Chargement le plus long', accuracy: 'Précision maximale', description: 'Attente la plus longue et niveau de précision le plus élevé.' }
      }
    },
    language: {
      ...english.language,
      eyebrow: 'Langue',
      title: 'Choisir la langue',
      ariaLabel: 'Langue de transcription',
      options: {
        auto: { label: 'Détection auto', description: 'Laisser le modèle déduire la langue parlée.' },
        english: { label: 'Anglais', description: 'Voix en anglais.' },
        'zh-hans': { label: 'Chinois (simplifié)', description: 'Voix en chinois. La sortie est normalisée en chinois simplifié.' },
        'zh-hant': { label: 'Chinois (traditionnel)', description: 'Voix en chinois. La sortie est normalisée en chinois traditionnel.' },
        japanese: { label: 'Japonais', description: 'Voix en japonais.' },
        korean: { label: 'Coréen', description: 'Voix en coréen.' },
        spanish: { label: 'Espagnol', description: 'Voix en espagnol.' },
        french: { label: 'Français', description: 'Voix en français.' },
        german: { label: 'Allemand', description: 'Voix en allemand.' }
      }
    },
    progress: {
      eyebrow: 'Progression',
      title: 'Progression',
      ariaLabel: 'Progression de la transcription',
      defaultMessage: 'Choisissez un fichier et démarrez la transcription.',
      estimatedRemaining: (minutes) => `Environ ${minutes} min restantes (estimation)`,
      estimatedLessThanMinute: 'Moins d une minute restante (estimation)',
      estimateMayVary: 'Le traitement peut prendre plus de temps que prévu.',
      labels: { complete: 'Terminé', loadingModel: 'Chargement du modèle...', transcribing: 'Transcription...', stopped: 'Arrêté', ready: 'Prêt' }
    },
    preview: {
      eyebrow: 'Aperçu en direct',
      title: 'Aperçu de la transcription',
      placeholder: 'Votre transcription apparaîtra ici.',
      ariaLabel: 'Aperçu de la transcription',
      timestampedAriaLabel: 'Aperçu avec horodatage',
      emptyDescription: 'L aperçu apparaît ici après la transcription.',
      segmentDescription: (count) => `${count} segment${count === 1 ? '' : 's'} de sous-titres disponible${count === 1 ? '' : 's'}.`
    },
    export: {
      eyebrow: 'Exporter les fichiers',
      ariaLabel: 'Télécharger les fichiers de transcription',
      formats: {
        txt: 'Texte brut pour notes, recherche, résumés et édition.',
        srt: 'Sous-titres pour CapCut, Premiere Pro, DaVinci Resolve, YouTube et la plupart des éditeurs.',
        vtt: 'Sous-titres WebVTT pour sites web, lecteurs vidéo en ligne et HTML video.',
        lrc: 'Paroles synchronisées pour lecteurs musicaux, vidéos de paroles et workflows karaoké.'
      }
    }
  },
  german: {
    ...english,
    browserTitle: 'Kostenloser KI-Transkribierer für Audio, Untertitel und Lyrics',
    tool: {
      ...english.tool,
      title: 'Kostenloses KI-Tool für Text, Untertitel und Lyrics',
      subtitle:
        'Nutze KI, um Audio oder Video im Browser in Text, Untertitel und zeitgesteuerte Lyrics umzuwandeln - ohne Anmeldung, Installation, Einrichtung oder feste Zeitbegrenzung.',
      ariaLabel: 'Kostenloses KI-Transkriptionstool',
      steps: [
        { title: 'Hochladen', description: 'Audio- oder Videodatei hinzufügen' },
        { title: 'Transkribieren', description: 'KI wandelt Sprache in Text um' },
        { title: 'Exportieren', description: 'Transkript herunterladen' }
      ],
      actions: { start: 'Transkription starten', cancel: 'Abbrechen' },
      messages: {
        chooseFile: 'Bitte zuerst eine unterstützte Audio- oder Videodatei wählen.',
        fileReady: 'Datei bereit. Einstellungen wählen und Transkription starten.',
        workerFailed: 'Der Transkriptionsprozess konnte nicht gestartet werden. Seite neu laden oder einen neueren Browser verwenden.',
        fileTransferFailed: 'Der Browser konnte die ausgewählte Datei nicht an den Transkriptionsprozess übergeben.',
        preparingText: 'Transkripttext wird vorbereitet.',
        complete: 'Transkription abgeschlossen. Text prüfen und Dateien exportieren.',
        stopped: 'Transkription gestoppt.',
        decoding: 'Die ausgewählte Datei wird lokal im Browser dekodiert.',
        preparingModel: (modelName) => `${modelName} wird für die lokale Browser-Transkription geladen. Das kann etwas dauern, bitte warte einen Moment.`,
        workerStartupTimeout: 'Der Transkriptionsprozess startete nicht innerhalb von 30 Sekunden. Seite neu laden.',
        modelStalled: 'Das Modell hat zwei Minuten lang nicht geantwortet. Modelldateien oder Verbindung prüfen.',
        workerErrors: {
          'model-files': 'Eine oder mehrere KI-Modelldateien konnten nicht gelesen werden. Lokale Modelle prüfen.',
          'model-init': 'Die Dateien wurden geladen, aber der Browser konnte das Modell nicht initialisieren. Ant Model oder einen anderen Browser verwenden.',
          network: 'Der Browser konnte die Modelldateien nicht abrufen. Verbindung prüfen.',
          memory: 'Der Browser hat nicht genügend Speicher. Ein kleineres Modell verwenden oder andere Tabs schließen.',
          normalization: 'Die Transkription ist fertig, aber die Umwandlung chinesischer Schriftzeichen ist fehlgeschlagen. Erneut versuchen.',
          unknown: 'Transkription fehlgeschlagen. Ein anderes Modell oder eine andere Datei verwenden.'
        },
        cancelled: 'Transkription abgebrochen.'
      },
      notices: {
        local: 'Deine Datei wird lokal in deinem Browser verarbeitet und nicht auf unseren Server hochgeladen.',
        firstUse: 'Das Laden des KI-Modells und die Transkription können etwas dauern. Wenn sich der Fortschrittsbalken kurz nicht bewegt, wird weiter verarbeitet. Bitte habe etwas Geduld.'
      }
    },
    upload: {
      eyebrow: 'Hochladen',
      title: 'Audio oder Video hochladen',
      dragDrop: 'Audio- oder Videodatei hierher ziehen',
      browse: 'oder klicken zum Auswählen',
      formats: 'MP3, WAV, M4A, MP4, MOV, MKV und WebM',
      removeFile: 'Datei entfernen',
      fileCategories: { audio: 'Audio', video: 'Video', unknown: 'unbekannt' }
    },
    model: {
      ...english.model,
      eyebrow: 'Modell',
      title: 'Modell wählen',
      ariaLabel: 'Transkriptionsmodell',
      accuracySuffix: 'Genauigkeit',
      loadSuffix: 'Last',
      options: {
        ant: { name: 'Ant Model', speed: 'Kürzestes Laden', accuracy: 'Niedrige Genauigkeit', description: 'Kürzeste Ladezeit und niedrigste Genauigkeitsstufe.' },
        fox: { name: 'Fox Model', speed: 'Mittleres Laden', accuracy: 'Mittlere Genauigkeit', description: 'Mittlere Stufe bei Ladezeit und Genauigkeit.' },
        tiger: { name: 'Tiger Model', speed: 'Längeres Laden', accuracy: 'Hohe Genauigkeit', description: 'Längere Ladezeit mit hoher Genauigkeitsstufe.' },
        'blue-whale': { name: 'Whale Model', speed: 'Längstes Laden', accuracy: 'Höchste Genauigkeit', description: 'Längste Ladezeit und höchste Genauigkeitsstufe.' }
      }
    },
    language: {
      ...english.language,
      eyebrow: 'Sprache',
      title: 'Sprache wählen',
      ariaLabel: 'Transkriptionssprache',
      options: {
        auto: { label: 'Automatisch erkennen', description: 'Das Modell erkennt die gesprochene Sprache.' },
        english: { label: 'Englisch', description: 'Englische Sprache.' },
        'zh-hans': { label: 'Chinesisch (vereinfacht)', description: 'Chinesische Sprache. Die Ausgabe wird als vereinfachtes Chinesisch vereinheitlicht.' },
        'zh-hant': { label: 'Chinesisch (traditionell)', description: 'Chinesische Sprache. Die Ausgabe wird als traditionelles Chinesisch vereinheitlicht.' },
        japanese: { label: 'Japanisch', description: 'Japanische Sprache.' },
        korean: { label: 'Koreanisch', description: 'Koreanische Sprache.' },
        spanish: { label: 'Spanisch', description: 'Spanische Sprache.' },
        french: { label: 'Französisch', description: 'Französische Sprache.' },
        german: { label: 'Deutsch', description: 'Deutsche Sprache.' }
      }
    },
    progress: {
      eyebrow: 'Fortschritt',
      title: 'Fortschritt',
      ariaLabel: 'Transkriptionsfortschritt',
      defaultMessage: 'Datei wählen und Transkription starten.',
      estimatedRemaining: (minutes) => `Noch etwa ${minutes} Min. (Schätzung)`,
      estimatedLessThanMinute: 'Weniger als 1 Min. (Schätzung)',
      estimateMayVary: 'Die Verarbeitung kann länger als geschätzt dauern.',
      labels: { complete: 'Fertig', loadingModel: 'Modell wird geladen...', transcribing: 'Transkription läuft...', stopped: 'Gestoppt', ready: 'Bereit' }
    },
    preview: {
      eyebrow: 'Live-Vorschau',
      title: 'Transkriptvorschau',
      placeholder: 'Dein Transkript erscheint hier.',
      ariaLabel: 'Transkriptvorschau',
      timestampedAriaLabel: 'Transkriptvorschau mit Zeitstempeln',
      emptyDescription: 'Die Vorschau erscheint hier nach der Transkription.',
      segmentDescription: (count) => `${count} Untertitel-Segment${count === 1 ? '' : 'e'} verfügbar.`
    },
    export: {
      eyebrow: 'Dateien exportieren',
      ariaLabel: 'Transkriptdateien herunterladen',
      formats: {
        txt: 'Klartext für Notizen, Suche, Zusammenfassungen und Copy-Editing.',
        srt: 'Untertitel für CapCut, Premiere Pro, DaVinci Resolve, YouTube und die meisten Editoren.',
        vtt: 'WebVTT-Untertitel für Websites, Online-Videoplayer und HTML video.',
        lrc: 'Zeitgesteuerte Lyrics für Musikplayer, Lyric-Videos und Karaoke-Workflows.'
      }
    }
  }
};

export function getHomeUiCopy(language: LanguageCode): HomeUiCopy {
  if (language === 'auto') {
    return english;
  }

  return homeUiCopy[language] ?? english;
}
