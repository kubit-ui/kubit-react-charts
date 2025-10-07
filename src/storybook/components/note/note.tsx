import { type ReactNode, useState } from 'react';

import './note.css';

type NoteVariant = 'information' | 'success' | 'warning' | 'error';

export interface INote {
  variant?: NoteVariant;
  heading?: ReactNode;
  text?: ReactNode[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const Note = ({
  collapsible = false,
  defaultCollapsed = false,
  heading,
  text,
  variant = 'information',
}: INote): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div
      className={`kbt-note-container kbt-note-${variant} ${isCollapsed ? 'kbt-note-collapsed' : ''}`}
    >
      <div className="kbt-note-header">
        {heading && <div className="kbt-note-heading">{heading}</div>}
        {collapsible && (
          <button
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand note' : 'Collapse note'}
            className="kbt-note-toggle"
            type="button"
            onClick={toggleCollapse}
          >
            <span
              className={`kbt-note-toggle-icon ${isCollapsed ? 'kbt-note-toggle-icon-collapsed' : ''}`}
            >
              ▼
            </span>
          </button>
        )}
      </div>
      {text && (
        <div className="kbt-note-content">
          <div className="kbt-note-text">
            {text.map((t, idx) => (
              <div key={`${idx.toString()}`}>{t}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
