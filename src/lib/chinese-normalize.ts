import type { LanguageCode, TranscriptResult } from './types';

type Converter = (text: string) => string;
type ConverterKind = 'simplified' | 'traditional';

const converterPromises = new Map<ConverterKind, Promise<Converter>>();

const simplifiedCleanup: Array<[RegExp, string]> = [
  [/臺/g, '台'],
  [/裏/g, '里'],
  [/麵/g, '面'],
  [/軟體/g, '软件'],
  [/软体/g, '软件'],
  [/網路/g, '网络'],
  [/影片/g, '视频'],
  [/語音/g, '语音'],
  [/轉寫/g, '转写'],
  [/免費/g, '免费'],
  [/註冊/g, '注册'],
  [/字幕檔/g, '字幕文件'],
  [/字幕档/g, '字幕文件']
];

const traditionalCleanup: Array<[RegExp, string]> = [
  [/软件/g, '軟體'],
  [/网络/g, '網路'],
  [/视频/g, '影片'],
  [/視頻/g, '影片'],
  [/音频/g, '音訊'],
  [/语音/g, '語音'],
  [/转写/g, '轉寫'],
  [/導出/g, '匯出'],
  [/免费/g, '免費'],
  [/注册/g, '註冊'],
  [/字幕文件/g, '字幕檔案'],
  [/字幕档/g, '字幕檔'],
  [/网页/g, '網頁']
];

const simplifiedCharacterFallback: Record<string, string> = {
  這: '这',
  個: '个',
  會: '会',
  為: '为',
  語: '语',
  轉: '转',
  寫: '写',
  體: '体',
  檔: '档',
  視: '视',
  頻: '频',
  訊: '讯',
  音: '音',
  聲: '声',
  標: '标',
  點: '点',
  擊: '击',
  選: '选',
  擇: '择',
  載: '载',
  入: '入',
  匯: '汇',
  導: '导',
  出: '出',
  處: '处',
  理: '理',
  網: '网',
  頁: '页',
  瀏: '浏',
  覽: '览',
  器: '器',
  開: '开',
  始: '始',
  後: '后',
  還: '还',
  與: '与',
  讓: '让',
  說: '说',
  話: '话',
  認: '认',
  識: '识',
  輸: '输',
  結: '结',
  果: '果',
  資: '资',
  料: '料',
  時: '时',
  間: '间',
  長: '长',
  短: '短',
  準: '准',
  確: '确',
  率: '率',
  內: '内',
  容: '容',
  問: '问',
  題: '题',
  錯: '错',
  誤: '误',
  發: '发',
  現: '现',
  顯: '显',
  示: '示',
  聽: '听',
  對: '对',
  應: '应',
  用: '用',
  無: '无',
  需: '需',
  註: '注',
  冊: '册',
  安: '安',
  裝: '装',
  設: '设',
  定: '定'
};

const traditionalCharacterFallback: Record<string, string> = {
  这: '這',
  个: '個',
  会: '會',
  为: '為',
  语: '語',
  转: '轉',
  写: '寫',
  体: '體',
  档: '檔',
  视: '視',
  频: '頻',
  讯: '訊',
  声: '聲',
  标: '標',
  点: '點',
  击: '擊',
  选: '選',
  择: '擇',
  载: '載',
  处: '處',
  网: '網',
  页: '頁',
  浏: '瀏',
  览: '覽',
  开: '開',
  后: '後',
  还: '還',
  与: '與',
  让: '讓',
  说: '說',
  话: '話',
  认: '認',
  识: '識',
  输: '輸',
  结: '結',
  资: '資',
  时: '時',
  间: '間',
  长: '長',
  准: '準',
  确: '確',
  内: '內',
  问: '問',
  题: '題',
  错: '錯',
  误: '誤',
  发: '發',
  现: '現',
  显: '顯',
  对: '對',
  应: '應',
  无: '無',
  注: '註',
  册: '冊',
  装: '裝',
  设: '設',
  台: '臺'
};

function getConverterKind(language: LanguageCode): ConverterKind | null {
  if (language === 'zh-hans') return 'simplified';
  if (language === 'zh-hant') return 'traditional';
  return null;
}

function getConverter(kind: ConverterKind): Promise<Converter> {
  const cached = converterPromises.get(kind);
  if (cached) {
    return cached;
  }

  const converterPromise = (
    kind === 'simplified' ? import('opencc-js/t2cn') : import('opencc-js/cn2t')
  ).then((module) =>
    kind === 'simplified'
      ? module.default.Converter({ from: 't', to: 'cn' })
      : module.default.Converter({ from: 'cn', to: 'tw' })
  );

  converterPromises.set(kind, converterPromise);
  return converterPromise;
}

function cleanupSimplifiedText(text: string) {
  const phraseCleaned = simplifiedCleanup.reduce(
    (nextText, [pattern, replacement]) => nextText.replace(pattern, replacement),
    text
  );

  return Array.from(phraseCleaned)
    .map((char) => simplifiedCharacterFallback[char] ?? char)
    .join('');
}

function cleanupTraditionalText(text: string) {
  const phraseCleaned = traditionalCleanup.reduce(
    (nextText, [pattern, replacement]) => nextText.replace(pattern, replacement),
    text
  );

  return Array.from(phraseCleaned)
    .map((char) => traditionalCharacterFallback[char] ?? char)
    .join('');
}

function convertText(text: string, converter: Converter, kind: ConverterKind) {
  const converted = converter(text);
  if (kind === 'simplified') {
    return cleanupSimplifiedText(converted);
  }

  return cleanupTraditionalText(converted);
}

export async function normalizeTranscriptForLanguage(
  result: TranscriptResult,
  language: LanguageCode
): Promise<TranscriptResult> {
  const converterKind = getConverterKind(language);

  if (!converterKind) {
    return result;
  }

  const converter = await getConverter(converterKind);

  return {
    ...result,
    text: convertText(result.text, converter, converterKind),
    segments: result.segments.map((segment) => ({
      ...segment,
      text: convertText(segment.text, converter, converterKind)
    }))
  };
}
