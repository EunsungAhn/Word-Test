import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategorySelector() {
  const navigate = useNavigate();

  const categories = [
    { id: 'kanji', name: '한자' },
    { id: 'japanese', name: '일본어' },
    { id: 'joayo', name: '좋아요 일본어' },
    { id: 'toeic', name: '해커스 노랭이' },
  ];

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>단어장 학습 앱</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>공부할 과목을 선택하세요.</p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/${cat.id}`)}
            style={{
              padding: '16px 24px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '10px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;