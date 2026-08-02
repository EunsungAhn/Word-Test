import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import DaySelector from './DaySelector';
import KANJIQuiz from './KANJIQuiz';
import TOEICQuiz from './TOEICQuiz';
import JAPANESEQuiz from './JAPANESEQuiz';

// 라우터용 퀴즈 래퍼 컴포넌트 (URL 파라미터를 읽어와 Quiz 컴포넌트에 전달)
function QuizWrapper() {
  const { category, fileName } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/${category}`);
  };

  if (category === 'kanji') {
    return <KANJIQuiz category={category} fileName={fileName} onBack={handleBack} />;
  } else if (category === 'japanese') {
    return <JAPANESEQuiz category={category} fileName={fileName} onBack={handleBack} />;
  } else {
    return <TOEICQuiz category={category} fileName={fileName} onBack={handleBack} />;
  }
}

// 라우터용 단어장 선택 래퍼 컴포넌트
function DaySelectorWrapper() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <DaySelector
      category={category}
      onSelectFile={(fileName) => navigate(`/${category}/${fileName}`)}
      onBack={() => navigate('/')}
    />
  );
}

// 메인 앱 컴포넌트
function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* 1. 홈 (메인 과목 선택 화면) -> http://localhost:3000/ */}
      <Route 
        path="/" 
        element={<CategorySelector onSelectCategory={(cat) => navigate(`/${cat}`)} />} 
      />

      {/* 2. 과목별 목록 선택 화면 -> http://localhost:3000/kanji */}
      <Route 
        path="/:category" 
        element={<DaySelectorWrapper />} 
      />

      {/* 3. 단어장 퀴즈 화면 -> http://localhost:3000/kanji/4-1.txt */}
      <Route 
        path="/:category/:fileName" 
        element={<QuizWrapper />} 
      />
    </Routes>
  );
}

export default App;