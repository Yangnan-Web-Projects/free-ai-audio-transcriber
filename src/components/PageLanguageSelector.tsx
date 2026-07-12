import { useEffect, useState } from 'react';
import { GitFork, Globe2 } from 'lucide-react';
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
        <GitFork size={19} aria-hidden="true" />
      </a>
    </div>
  );
}
