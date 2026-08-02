import React from 'react';

// kanji는 급수별 줄바꿈을 위해 그룹(배열의 배열) 구조로 관리합니다.
const KANJI_GROUPS = [
  // 9급
  [
    { id: '9.txt', name: '9급' }
  ],
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

const FILE_MAP = {
  toeic: [
    { id: 'day_1.txt', name: 'Day 1' },
    { id: 'day_2.txt', name: 'Day 2' },
    { id: 'day_3.txt', name: 'Day 3' },
    { id: 'day_4.txt', name: 'Day 4' },
    { id: 'day_5.txt', name: 'Day 5' },
    { id: 'day_6.txt', name: 'Day 6' },
    { id: 'day_7.txt', name: 'Day 7' },
    { id: 'day_8.txt', name: 'Day 8' },
    { id: 'day_9.txt', name: 'Day 9' },
    { id: 'day_10.txt', name: 'Day 10' },
    { id: 'day_11.txt', name: 'Day 11' },
    { id: 'day_12.txt', name: 'Day 12' },
    { id: 'day_13.txt', name: 'Day 13' },
    { id: 'day_14.txt', name: 'Day 14' },
    { id: 'day_15.txt', name: 'Day 15' },
    { id: 'day_16.txt', name: 'Day 16' },
    { id: 'day_17.txt', name: 'Day 17' },
    { id: 'day_18.txt', name: 'Day 18' },
    { id: 'day_19.txt', name: 'Day 19' },
    { id: 'day_20.txt', name: 'Day 20' },
    { id: 'day_21.txt', name: 'Day 21' },
    { id: 'day_22.txt', name: 'Day 22' },
    { id: 'day_23.txt', name: 'Day 23' },
    { id: 'day_24.txt', name: 'Day 24' },
    { id: 'day_25.txt', name: 'Day 25' },
    { id: 'day_26.txt', name: 'Day 26' },
    { id: 'day_27.txt', name: 'Day 27' },
    { id: 'day_28.txt', name: 'Day 28' },
    { id: 'day_29.txt', name: 'Day 29' },
    { id: 'day_30.txt', name: 'Day 30' },
  ],
  japanese: [
    { id: '0_이형용사_ad.txt', name: 'い형용사' },
    { id: '0_이형용사_hard.txt', name: 'い형용사 고난도' },
    { id: '1_나형용사.txt', name: 'な형용사' },
    { id: '2_동사.txt', name: '동사' },
    { id: '2_동사_고난도.txt', name: '동사 고난도' },
    { id: '3_좋아요일본어_1.txt', name: '3_좋아요일본어 1과' },
    { id: '4_문장.txt', name: '문장' },
  ],
};

function DaySelector({ category, onSelectFile, onBack }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{category.toUpperCase()} 단어장 선택</h2>
      <button 
        onClick={onBack}
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}
      >
        ← 과목 변경
      </button>

      {category === 'kanji' ? (
        /* 한자(kanji)일 때: 급수별 그룹 단위 렌더링 */
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {KANJI_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '10px'
              }}>
                {group.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => onSelectFile(file.id)}
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
      ) : (
        /* TOEIC / JAPANESE일 때: 일반 그리스 스타일 렌더링 */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {(FILE_MAP[category] || []).map((file) => (
            <button
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              style={{
                padding: '16px 12px',
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

export default DaySelector;