import { describe, expect, it } from 'vitest';
import { normalizeTranscriptForLanguage } from './chinese-normalize';
import type { TranscriptResult } from './types';

const traditionalResult: TranscriptResult = {
  text: '這是一個繁體字幕檔，軟體會把語音轉寫成文字。',
  segments: [
    {
      id: 1,
      start: 0,
      end: 4,
      text: '這是一個繁體字幕檔。'
    },
    {
      id: 2,
      start: 4,
      end: 8,
      text: '軟體會把語音轉寫成文字。'
    }
  ],
  modelId: 'test-model',
  language: 'zh-hans',
  generatedAt: '2026-07-09T00:00:00.000Z'
};

describe('Chinese transcript normalization', () => {
  it('normalizes Traditional Chinese text and segments to Simplified Chinese', async () => {
    const normalized = await normalizeTranscriptForLanguage(traditionalResult, 'zh-hans');

    expect(normalized.text).toContain('这是一个繁体字幕文件');
    expect(normalized.text).toContain('软件会把语音转写成文字');
    expect(normalized.segments[0].text).toBe('这是一个繁体字幕文件。');
    expect(normalized.segments[1].text).toBe('软件会把语音转写成文字。');
  });

  it('cleans up common Traditional Chinese leftovers after OpenCC conversion', async () => {
    const normalized = await normalizeTranscriptForLanguage(
      {
        ...traditionalResult,
        text: '請選擇簡體中文，轉寫後會顯示網頁影片時間，並匯出字幕檔。',
        segments: [
          {
            id: 1,
            start: 0,
            end: 5,
            text: '請選擇簡體中文，轉寫後會顯示網頁影片時間。'
          },
          {
            id: 2,
            start: 5,
            end: 8,
            text: '並匯出字幕檔。'
          }
        ]
      },
      'zh-hans'
    );

    expect(normalized.text).toBe('请选择简体中文，转写后会显示网页视频时间，并汇出字幕文件。');
    expect(normalized.segments[0].text).toBe('请选择简体中文，转写后会显示网页视频时间。');
    expect(normalized.segments[1].text).toBe('并汇出字幕文件。');
  });

  it('converts a mixed-script transcript and all timestamp segments to Simplified Chinese', async () => {
    const normalized = await normalizeTranscriptForLanguage(
      {
        ...traditionalResult,
        text: '歡迎來到這個頻道，請點擊訂閱，並開啟通知。视频字幕會在轉寫完成後匯出。',
        segments: [
          {
            id: 1,
            start: 0,
            end: 5,
            text: '歡迎來到這個頻道，請點擊訂閱，並開啟通知。'
          },
          {
            id: 2,
            start: 5,
            end: 10,
            text: '视频字幕會在轉寫完成後匯出。'
          }
        ]
      },
      'zh-hans'
    );

    expect(normalized.text).toBe('欢迎来到这个频道，请点击订阅，并开启通知。视频字幕会在转写完成后汇出。');
    expect(normalized.segments[0].text).toBe('欢迎来到这个频道，请点击订阅，并开启通知。');
    expect(normalized.segments[1].text).toBe('视频字幕会在转写完成后汇出。');
  });

  it('normalizes Simplified Chinese text and segments to Traditional Chinese', async () => {
    const normalized = await normalizeTranscriptForLanguage(
      {
        ...traditionalResult,
        text: '请选择繁体中文，转写后会显示网页视频时间，并导出字幕文件。',
        segments: [
          {
            id: 1,
            start: 0,
            end: 5,
            text: '请选择繁体中文，转写后会显示网页视频时间。'
          },
          {
            id: 2,
            start: 5,
            end: 8,
            text: '并导出字幕文件。'
          }
        ]
      },
      'zh-hant'
    );

    expect(normalized.text).toBe('請選擇繁體中文，轉寫後會顯示網頁影片時間，並匯出字幕檔案。');
    expect(normalized.segments[0].text).toBe('請選擇繁體中文，轉寫後會顯示網頁影片時間。');
    expect(normalized.segments[1].text).toBe('並匯出字幕檔案。');
  });
});
