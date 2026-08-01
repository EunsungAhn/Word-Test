import React, { useState } from 'react';
import DaySelector from './DaySelector';
import TOEICQuiz from './TOEICQuiz';
import JAPANESEQuiz from './JAPANESEQuiz';
import KANJIQuiz from './KANJIQuiz';
import './App.css';

function App() {
  const [category, setCategory] = useState(null); // 'toeic' | 'japanese' | 'kanji'
  const [selectedFileName, setSelectedFileName] = useState(null);

  // 1. 과목 선택 화면 (비밀번호 화면 제거됨)
  if (!category) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h1>학습 과목 선택</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <button
            onClick={() => setCategory('toeic')}
            style={{ padding: '20px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '8px' }}
          >
            TOEIC
          </button>
          <button
            onClick={() => setCategory('japanese')}
            style={{ padding: '20px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '8px' }}
          >
            Japanese
          </button>
          <button
            onClick={() => setCategory('kanji')}
            style={{ padding: '20px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '8px' }}
          >
            Kanji
          </button>
        </div>
      </div>
    );
  }

  // 2. 파일 선택 화면
  if (!selectedFileName) {
    return (
      <DaySelector
        category={category}
        onSelectFile={(fileName) => setSelectedFileName(fileName)}
        onBack={() => setCategory(null)}
      />
    );
  }

  // 3. 단어 퀴즈 화면 (과목별로 다른 컴포넌트 렌더링)
  const handleBack = () => setSelectedFileName(null);

  if (category === 'japanese') {
    return <JAPANESEQuiz category={category} fileName={selectedFileName} onBack={handleBack} />;
  }
  if (category === 'kanji') {
    return <KANJIQuiz category={category} fileName={selectedFileName} onBack={handleBack} />;
  }
  
  // 기본값 (TOEIC)
  return <TOEICQuiz category={category} fileName={selectedFileName} onBack={handleBack} />;
}

export default App;