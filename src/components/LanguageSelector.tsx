import { Languages } from 'lucide-react';
import { languageOptions } from '@lib/model-options';
import type { HomeUiCopy } from '@lib/ui-copy';
import type { LanguageCode } from '@lib/types';

interface LanguageSelectorProps {
  selected: LanguageCode;
  copy: HomeUiCopy['language'];
  onChange: (code: LanguageCode) => void;
}

export function LanguageSelector({ selected, copy, onChange }: LanguageSelectorProps) {
  return (
    <section className="tool-section compact-section" aria-labelledby="language-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="language-title">{copy.title}</h2>
      </div>
      <label className="select-label">
        <Languages size={18} aria-hidden="true" />
        <select
          value={selected}
          onChange={(event) => onChange(event.target.value as LanguageCode)}
          aria-label={copy.ariaLabel}
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {copy.options[option.code].label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
