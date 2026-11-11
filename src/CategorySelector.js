import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyMenu.css';

export const CATEGORIES = [
  { id: 'japanese', name: '일본어', detail: '기초 어휘부터 N3 문법까지', mark: 'あ' },
  { id: 'hackers_n3', name: '해커스 N3', detail: '페이지별로 차근차근', mark: 'N3' },
  { id: 'darakwon_n3', name: '다락원 N3', detail: '문제와 어휘를 함께', mark: 'N3' },
  { id: 'darakwon_n4', name: '다락원 N4', detail: '기본기를 단단하게', mark: 'N4' },
  { id: 'joayo', name: '좋아요 일본어', detail: '교재와 함께하는 복습', mark: 'よ' },
  { id: 'kanji', name: '한자', detail: '급수별 한자와 헷갈리는 글자', mark: '字' },
  { id: 'toeic', name: '해커스 노랭이', detail: '하루씩 쌓아가는 토익 어휘', mark: 'Aa' },
];

function CategorySelector() {
  const navigate = useNavigate();
  return (
    <main className="study-menu">
      <div className="sm-shell">
        <header className="sm-top"><span className="sm-top-note">한 단어씩, 매일 조금씩</span></header>
        <section className="sm-intro">
          <p className="sm-eyebrow">MY WORD COLLECTION</p>
          <h1>오늘은 어떤 단어를<br />만나볼까요?</h1>
          <p className="sm-description">공부할 단어장을 골라 나만의 속도로 시작해 보세요.</p>
        </section>
        <div className="sm-section-heading"><h2>나의 단어장</h2><span>{CATEGORIES.length}개의 학습 메뉴</span></div>
        <nav className="sm-categories" aria-label="학습 과목">
          {CATEGORIES.map((cat) => (
            <button className="sm-category" key={cat.id} onClick={() => navigate(`/${cat.id}`)}>
              <span className="sm-mark" aria-hidden="true">{cat.mark}</span>
              <span className="sm-category-copy"><span className="sm-category-name">{cat.name}</span><span className="sm-category-detail">{cat.detail}</span></span>
              <span className="sm-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
        <footer className="sm-footer">오타를 발견하셨나요? <a href="mailto:esahn97@gmail.com">esahn97@gmail.com</a></footer>
      </div>
    </main>
  );
}
export default CategorySelector;
