import { useEffect, useState } from 'react';
import { Globe2 } from 'lucide-react';
import {
  getInitialLanguagePreference,
  LANGUAGE_PREFERENCE_EVENT,
  pageLanguageOptions,
  setLanguagePreference
} from '@lib/language-preference';
import type { LanguageCode } from '@lib/types';

export function PageLanguageSelector() {
  const [selected, setSelected] = useState<LanguageCode>('english');
  const githubUrl =
    import.meta.env.PUBLIC_GITHUB_URL ||
    'https://github.com/yangnan-web-projects/free-ai-audio-transcriber';

  useEffect(() => {
    setSelected(getInitialLanguagePreference());

    const handlePreferenceChange = (event: Event) => {
      const code = (event as CustomEvent<{ code?: LanguageCode }>).detail?.code;
      if (code) {
        setSelected(code);
      }
    };

    window.addEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
    return () => window.removeEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
  }, []);

  return (
    <div className="header-actions">
      <label className="page-language-selector" aria-label="Language">
        <Globe2 size={18} aria-hidden="true" />
        <select
          value={selected}
          onChange={(event) => setLanguagePreference(event.target.value as LanguageCode)}
        >
          {pageLanguageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <a
        className="header-github-link"
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="View source on GitHub"
        title="View source on GitHub"
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.44c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      </a>
    </div>
  );
}
