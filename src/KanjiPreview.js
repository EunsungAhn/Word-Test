import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizLayout from './QuizLayout';
import KanjiWord from './KanjiWord';

const word = { word: '好きだ', furigana: 'すきだ', meaning: '좋아하다' };
// 네이버 일본어사전의 한국한자 표기를 직접 확인한 미리보기 데이터.
const entries = {
  好: { reading: '좋을 호', sourceUrl: 'https://ja.dict.naver.com/#/entry/jako/5dc65da74a464eaba8f9d6433d7e8a37' },
};

export default function KanjiPreview() {
  const [showMeaning, setShowMeaning] = useState(true);
  const navigate = useNavigate();
  return <QuizLayout label="JAPANESE · 한자 클릭 미리보기" language="ja"
    displayTitle="好きだ로 살펴보기" onBack={() => navigate('/japanese')}
    currentIndex={0} words={[word]} currentWord={word} showMeaning={showMeaning}
    isLastWord={false} handleAction={() => setShowMeaning((value) => !value)}
    getButtonText={() => showMeaning ? '정답 가리기' : '정답 확인'}
    wordContent={<KanjiWord word={word.word} entries={entries} />} />;
}
