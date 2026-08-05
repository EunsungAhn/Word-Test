import React from 'react';

// 한자 파일 데이터 (급수별 대괄호 중첩 구조)
const KANJI_GROUPS = [
  // 9급
  [{ id: '9.txt', name: '9급' }],
  // 8급
  [
    { id: '8-1.txt', name: '8급 (1)' },
    { id: '8-2.txt', name: '8급 (2)' },
    { id: '8-3.txt', name: '8급 (3)' },
  ],
  // 7급
  [
    { id: '7-1.txt', name: '7급 (1)' },
    { id: '7-2.txt', name: '7급 (2)' },
    { id: '7-3.txt', name: '7급 (3)' },
    { id: '7-4.txt', name: '7급 (4)' },
    { id: '7-5.txt', name: '7급 (5)' },
  ],
  // 6급
  [
    { id: '6-1.txt', name: '6급 (1)' },
    { id: '6-2.txt', name: '6급 (2)' },
    { id: '6-3.txt', name: '6급 (3)' },
    { id: '6-4.txt', name: '6급 (4)' },
    { id: '6-5.txt', name: '6급 (5)' },
  ],
  // 5급
  [
    { id: '5-1.txt', name: '5급 (1)' },
    { id: '5-2.txt', name: '5급 (2)' },
    { id: '5-3.txt', name: '5급 (3)' },
    { id: '5-4.txt', name: '5급 (4)' },
    { id: '5-5.txt', name: '5급 (5)' },
  ],
  // 4급
  [
    { id: '4-1.txt', name: '4급 (1)' },
    { id: '4-2.txt', name: '4급 (2)' },
    { id: '4-3.txt', name: '4급 (3)' },
    { id: '4-4.txt', name: '4급 (4)' },
    { id: '4-5.txt', name: '4급 (5)' },
    { id: '4-6.txt', name: '4급 (6)' },
    { id: '4-7.txt', name: '4급 (7)' },
    { id: '4-8.txt', name: '4급 (8)' },
    { id: '4-9.txt', name: '4급 (9)' },
    { id: '4-10.txt', name: '4급 (10)' },
    { id: '4-11.txt', name: '4급 (11)' },
    { id: '4-12.txt', name: '4급 (12)' },
    { id: '4-13.txt', name: '4급 (13)' },
    { id: '4-14.txt', name: '4급 (14)' },
    { id: '4-15.txt', name: '4급 (15)' },
  ]
];

// 일본어 파일 데이터 (숫자 카테고리별 대괄호 중첩 구조 - KANJI_GROUPS와 동일 구조)
const JAPANESE_GROUPS = [
  // 0_
  [
    { id: '0_이형용사.txt', name: 'い형용사' },
    { id: '0_이형용사_고난도.txt', name: 'い형용사 고난도' },
    { id: '0_나형용사.txt', name: 'な형용사' },
    { id: '0_동사.txt', name: '동사' },
    { id: '0_동사_고난도.txt', name: '동사 고난도' },
  ],
  // 3_
  [
    { id: '1_좋아요下_01.txt', name: '좋아요下 1과' },
    { id: '1_좋아요下_09.txt', name: '좋아요下 9과' },
    { id: '1_좋아요下_10.txt', name: '좋아요下 10과' },
    { id: '1_좋아요下_11.txt', name: '좋아요下 11과' },
    { id: '1_좋아요下_12.txt', name: '좋아요下 12과' },
  ],
  // 4_
  [
    { id: '2_민나교재_1-10과.txt', name: '민나교재 1~10과' },
    { id: '2_민나교재_11-14과.txt', name: '민나교재 11~14과' },
    { id: '2_민나교재_15-17과.txt', name: '민나교재 15~17과' },
    { id: '2_민나교재_18-19과.txt', name: '민나교재 18~19과' },
  ],
  // 5_
  [
    { id: '3_민나문제_1-10과.txt', name: '민나문제 1~10과' },
    { id: '3_민나문제_11-19과.txt', name: '민나문제 11~19과' },
  ]
];

// TOEIC 파일 데이터
const TOEIC_FILES = Array.from({ length: 30 }, (_, i) => ({
  id: `day_${i + 1}.txt`,
  name: `Day ${i + 1}`
}));

function DaySelector({ category, onSelectFile, onBack }) {
  const getCategoryTitle = () => {
    switch (category) {
      case 'kanji':
        return 'KANJI';
      case 'japanese':
        return 'JAPANESE';
      case 'toeic':
        return 'TOEIC';
      default:
        return '';
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        ← 카테고리 선택으로
      </button>

      <h2>{getCategoryTitle()} 학습 선택</h2>

      {/* 한자(kanji) : 대괄호 그룹 단위 렌더링 */}
      {category === 'kanji' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {KANJI_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '10px'
                }}
              >
                {group.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => onSelectFile(file.id, file.name)}
                    style={{
                      padding: '14px 10px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f8f9fa',
                      cursor: 'pointer'
                    }}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 일본어(japanese) : 한자와 완전 동일한 대괄호 그룹 렌더링 */}
      {category === 'japanese' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {JAPANESE_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '10px'
                }}
              >
                {group.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => onSelectFile(file.id, file.name)}
                    style={{
                      padding: '14px 10px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f8f9fa',
                      cursor: 'pointer'
                    }}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 토익(toeic) : 기존 단일 그리드 렌더링 */}
      {category === 'toeic' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '10px',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          {TOEIC_FILES.map((file) => (
            <button
              key={file.id}
              onClick={() => onSelectFile(file.id, file.name)}
              style={{
                padding: '14px 10px',
                fontSize: '15px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer'
              }}
            >
              {file.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// id로 매핑된 name을 꺼내주는 헬퍼 함수
export function getFileName(category, fileId) {
  if (category === 'kanji') {
    for (const group of KANJI_GROUPS) {
      const found = group.find((f) => f.id === fileId);
      if (found) return found.name;
    }
  } else if (category === 'japanese') {
    for (const group of JAPANESE_GROUPS) {
      const found = group.find((f) => f.id === fileId);
      if (found) return found.name;
    }
  } else if (category === 'toeic') {
    const found = TOEIC_FILES.find((f) => f.id === fileId);
    if (found) return found.name;
  }
  return fileId;
}

export default DaySelector;