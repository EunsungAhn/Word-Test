import React, { useState, useEffect } from 'react';

function KANJIQuiz({ category, fileName, onBack }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates 셔플 함수
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const filePath = `/${category}/${encodeURIComponent(fileName)}`;

    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error('단어장 파일을 찾을 수 없습니다.');
        return res.text();
      })
      .then((text) => {
        const parsedWords = text
          .split(/\r?\n/)
          .filter((line) => line.trim() !== '')
          .map((line) => {
            const [word, meaning] = line.split('\t');
            return { word: word ? word.trim() : '', meaning: meaning ? meaning.trim() : '' };
          });

        setWords(shuffleArray(parsedWords));
        setLoading(false);
      })
      .catch((err) => {
        alert(`오류 발생: ${err.message}`);
        setLoading(false);
      });
  }, [category, fileName]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  if (words.length === 0) return <div style={{ textAlign: 'center', padding: '50px' }}>데이터가 없습니다.</div>;

  const currentWord = words[currentIndex];
  const displayTitle = fileName.replace(/\.txt$/i, '');
  const isLastWord = currentIndex === words.length - 1;

  const handleAction = () => {
    if (!showMeaning) {
      setShowMeaning(true);
    } else {
      if (isLastWord) {
        setWords(shuffleArray(words));
        setCurrentIndex(0);
        setShowMeaning(false);
      } else {
        setShowMeaning(false);
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const getButtonText = () => {
    if (!showMeaning) return '정답 확인';
    if (isLastWord) return '재시작';
    return '다음 단어';
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>← 목록으로</button>
      <h3>한자 - {displayTitle} ({currentIndex + 1} / {words.length})</h3>

      {/* 수직 중앙 정렬(justifyContent: 'center') 적용 */}
      <div 
        onClick={handleAction}
        style={{
          border: '2px solid #333', borderRadius: '12px', padding: '20px', margin: '20px 0',
          height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', cursor: 'pointer', backgroundColor: '#fff', boxSizing: 'border-box'
        }}
      >
        <h1 style={{ margin: '0 0 16px 0', fontSize: '70px', lineHeight: '1.1' }}>{currentWord.word}</h1>
        
        <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {showMeaning ? (
            <p style={{ fontSize: '24px', color: '#1E88E5', margin: 0, fontWeight: '500' }}>{currentWord.meaning}</p>
          ) : (
            <p style={{ color: '#ccc', margin: 0, fontSize: '14px' }}>정답을 확인하세요.</p>
          )}
        </div>
      </div>

      <button 
        onClick={handleAction}
        style={{
          padding: '12px 24px', fontSize: '18px', color: '#fff', border: 'none', borderRadius: '6px',
          cursor: 'pointer', width: '100%', maxWidth: '300px', fontWeight: 'bold',
          backgroundColor: !showMeaning ? '#64B5F6' : (isLastWord ? '#FF9800' : '#78C850'),
          transition: 'background-color 0.2s ease'
        }}
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default KANJIQuiz;