import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

export default function KanjiWord({ word, entries }) {
  const [active, setActive] = useState(null);
  const root = useRef(null);
  const tooltip = useRef(null);
  const [shift, setShift] = useState(0);
  const id = useId();
  const entryFor = (character) => entries[character] || (/[\u3400-\u9fff\uf900-\ufaff]/u.test(character) ? { note: '네이버 훈음 확인 전' } : null);
  useEffect(() => {
    const closeOutside = (event) => {
      if (root.current && !root.current.contains(event.target)) setActive(null);
    };
    const closeEscape = (event) => { if (event.key === 'Escape') setActive(null); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeEscape);
    };
  }, []);
  useEffect(() => setActive(null), [word]);
  useLayoutEffect(() => {
    if (!tooltip.current) return;
    const bounds = tooltip.current.getBoundingClientRect();
    const availableRight = document.documentElement.clientWidth - 16;
    setShift(bounds.left < 16 ? 16 - bounds.left : bounds.right > availableRight ? availableRight - bounds.right : 0);
  }, [active]);
  return <span ref={root} className="jq-interactive-word">
    {Array.from(word).map((character, index) => entryFor(character) ? (
      <span className="jq-character-wrap" key={index}>
        <button type="button" className="jq-character-button" aria-label={`${character} 한자 뜻·음`}
          aria-expanded={active === index} aria-describedby={active === index ? `${id}-${index}` : undefined}
          onClick={(event) => { event.stopPropagation(); setShift(0); setActive(active === index ? null : index); }}>
          {character}
        </button>
        {active === index && <span ref={tooltip} className="jq-kanji-tooltip" id={`${id}-${index}`} role="tooltip" lang="ko" style={{ '--tooltip-shift': `${shift}px` }}>
          {entryFor(character).reading || entryFor(character).meaning || (entries[character] ? '훈음 정보 없음' : '훈음 확인 전')}
          {entryFor(character).note && <span className="jq-tooltip-note">{entryFor(character).note}</span>}
        </span>}
      </span>
    ) : <React.Fragment key={index}>{character}</React.Fragment>)}
  </span>;
}
