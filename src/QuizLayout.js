import React from 'react';
import './JAPANESEQuiz.css';

export default function QuizLayout({ label, language, onBack, displayTitle, currentIndex, words, showMeaning, currentWord, isLastWord, handleAction, getButtonText, onCardAction, kanjiBreakdown, wordContent }) {
  return (
    <main className="japanese-quiz">
      <div className="jq-layout">
        <header className="jq-header">
          <button className="jq-back" onClick={onBack}>← 단어장 목록</button>
        </header>

        <section className="jq-session" aria-labelledby="jq-title">
          <p className="jq-eyebrow">{label}</p>
          <h1 id="jq-title">{displayTitle}</h1>
          <div className="jq-progress-label">
            <span>오늘의 단어</span>
            <span><strong>{currentIndex + 1}</strong> / {words.length}</span>
          </div>
          <div className="jq-progress" role="progressbar" aria-label="단어 학습 진행률"
            aria-valuemin={0} aria-valuemax={words.length} aria-valuenow={currentIndex + 1}>
            <div style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} />
          </div>

          <article className="jq-card" onClick={onCardAction} onKeyDown={onCardAction ? (event) => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onCardAction(); } } : undefined} role={onCardAction ? (wordContent ? 'group' : 'button') : undefined} tabIndex={onCardAction ? 0 : undefined} aria-label={onCardAction ? `${getButtonText()} (단어 카드)` : undefined}>
            <h2 lang={language}>{wordContent || currentWord.word}</h2>
            <div className="jq-answer" aria-live="polite" aria-atomic="true">
              {showMeaning ? (
                <>
                  {currentWord.furigana && <p className="jq-reading" lang={language}>{currentWord.furigana}</p>}
                  <p className="jq-meaning">{currentWord.meaning}</p>
                </>
              ) : <p className="jq-hint">정답을 확인하세요.</p>}
            </div>
            {showMeaning && kanjiBreakdown && (
              <section className="jq-kanji" aria-label="한자 풀이">
                <p className="jq-kanji-label">한자 풀이</p>
                <div className="jq-kanji-grid">
                  {kanjiBreakdown.map(({ character, reading }) => (
                    <div className="jq-kanji-item" key={character}>
                      <span className="jq-kanji-character" lang="ja">{character}</span>
                      <span className="jq-kanji-reading">{reading}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          <button className={`jq-action${showMeaning && isLastWord ? ' jq-action-restart' : ''}`} onClick={handleAction}>
            <span>{getButtonText()}</span>
            <span aria-hidden="true">{showMeaning && isLastWord ? '↻' : '→'}</span>
          </button>
          <p className="jq-footer">{showMeaning && isLastWord
            ? '마지막 단어예요. 다시 시작하면 순서가 새롭게 섞여요.'
            : '서두르지 않고, 한 단어씩.'}</p>
        </section>
      </div>
    </main>
  );
}
