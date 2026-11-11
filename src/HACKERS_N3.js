import React, { useState, useEffect } from 'react';
import QuizLayout from './QuizLayout';
import KanjiWord from './KanjiWord';
import kanjiEntries from './data/kanji.json';

function HACKERS_N3({ category, fileName, onBack }) {
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
            const [num, word, furigana, meaning] = line.split('\t');
            return {
              num: num ? num.trim() : '',
              word: word ? word.trim() : '',
              furigana: furigana ? furigana.trim() : '',
              meaning: meaning ? meaning.trim() : '',
            };
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
    <QuizLayout
      label="JAPANESE · 해커스 N3" language="ja"
      onBack={onBack} displayTitle={displayTitle} currentIndex={currentIndex}
      words={words} showMeaning={showMeaning} currentWord={currentWord}
      isLastWord={isLastWord} handleAction={handleAction} getButtonText={getButtonText}
      wordContent={<KanjiWord key={currentIndex} word={currentWord.word} entries={kanjiEntries} />}
    />
  );
}

export default HACKERS_N3;
