import { modelOptions } from '@lib/model-options';
import type { HomeUiCopy } from '@lib/ui-copy';
import type { ModelMode } from '@lib/types';

interface ModelSelectorProps {
  selected: ModelMode;
  copy: HomeUiCopy['model'];
  onChange: (mode: ModelMode) => void;
}

const modelIconSources: Record<ModelMode, string> = {
  ant: '/icons/models/ant.png',
  fox: '/icons/models/fox.png',
  tiger: '/icons/models/tiger.png',
  'blue-whale': '/icons/models/whale.png'
};

export function ModelSelector({ selected, copy, onChange }: ModelSelectorProps) {
  return (
    <section className="tool-section" aria-labelledby="model-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="model-title">{copy.title}</h2>
      </div>

      <div className="model-segmented" role="radiogroup" aria-label={copy.ariaLabel}>
        {modelOptions.map((option) => {
          const isSelected = selected === option.mode;
          const optionCopy = copy.options[option.mode];

          return (
            <button
              className={isSelected ? 'selected' : ''}
              type="button"
              role="radio"
              aria-checked={isSelected}
              key={option.mode}
              onClick={() => onChange(option.mode)}
            >
              <span className="model-choice-icon">
                <img src={modelIconSources[option.mode]} alt="" aria-hidden="true" />
              </span>
              <span className="model-choice-name">{optionCopy.name}</span>
              <small>
                <span>{optionCopy.speed}</span>
                <span>{optionCopy.accuracy}</span>
              </small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
