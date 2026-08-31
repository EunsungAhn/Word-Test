import React from 'react';

// 한자 파일 데이터 (급수별 대괄호 중첩 구조)
const KANJI_GROUPS = [
  [{ id: '9.txt', name: '9급' }],
  [
    { id: '8-1.txt', name: '8급 (1)' },
    { id: '8-2.txt', name: '8급 (2)' },
    { id: '8-3.txt', name: '8급 (3)' },
  ],
  [
    { id: '7-1.txt', name: '7급 (1)' },
    { id: '7-2.txt', name: '7급 (2)' },
    { id: '7-3.txt', name: '7급 (3)' },
    { id: '7-4.txt', name: '7급 (4)' },
    { id: '7-5.txt', name: '7급 (5)' },
  ],
  [
    { id: '6-1.txt', name: '6급 (1)' },
    { id: '6-2.txt', name: '6급 (2)' },
    { id: '6-3.txt', name: '6급 (3)' },
    { id: '6-4.txt', name: '6급 (4)' },
    { id: '6-5.txt', name: '6급 (5)' },
  ],
  [
    { id: '5-1.txt', name: '5급 (1)' },
    { id: '5-2.txt', name: '5급 (2)' },
    { id: '5-3.txt', name: '5급 (3)' },
    { id: '5-4.txt', name: '5급 (4)' },
    { id: '5-5.txt', name: '5급 (5)' },
  ],
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
  ],
  [
    { id: 'total_987.txt', name: '9, 8, 7' },
    { id: 'total_6_1.txt', name: '6 - 1' },
    { id: 'total_6_2.txt', name: '6 - 2' },
    { id: 'total_5_1.txt', name: '5 - 1' },
    { id: 'total_5_2.txt', name: '5 - 2' },
    { id: 'total_4_1.txt', name: '4 - 1' },
    { id: 'total_4_2.txt', name: '4 - 2' },
    { id: 'total_4_3.txt', name: '4 - 3' },
    { id: 'confused1.txt', name: '헷갈려 1' },
    { id: 'confused2.txt', name: '헷갈려 2' },
    { id: '60갑자.txt', name: '60갑자 (시험X)' },
    { id: '어조사.txt', name: '어조사 (시험X)' },
  ]
];

// 일본어 파일 데이터 (숫자 카테고리별 대괄호 중첩 구조 - KANJI_GROUPS와 동일 구조)
const JAPANESE_GROUPS = [
  // tmp
  [
    { id: 'tmp.txt', name: 'tmp' },
  ],
  [
    { id: '0_이형용사.txt', name: 'い형용사' },
    { id: '0_나형용사.txt', name: 'な형용사' },
    { id: '0_동사.txt', name: '동사' },
    { id: '4_좋아요4_자동사타동사.txt', name: '자동사 타동사' },
  ],
  [
    { id: '5_N3_1_필수어휘_1.txt', name: 'N4 필수어휘 1' },
    { id: '5_N3_2_필수어휘_2.txt', name: 'N4 필수어휘 2' },
    { id: '5_N3_3_필수어휘_3.txt', name: 'N4 필수어휘 3' },
    { id: '5_N3_4_필수어휘_4.txt', name: 'N4 필수어휘 4' },
    { id: '5_N3_5_필수어휘_5.txt', name: 'N4 필수어휘 5' },
  ],
  [
    { id: '5_N3_6_청음탁음반탁음.txt', name: 'N3 청/탁/반탁음' },
    { id: '5_N3_7_장음단음.txt', name: 'N3 장/단음' },
    { id: '5_N3_8_촉음.txt', name: 'N3 촉음' },
    { id: '5_N3_9_음독여러개1.txt', name: 'N3 多음독 1' },
    { id: '5_N3_10_음독여러개2.txt', name: 'N3 多음독 2' },
    { id: '5_N3_11_음독여러개3.txt', name: 'N3 多음독 3' },
    { id: '5_N3_12_음독여러개4.txt', name: 'N3 多음독 4' },
    { id: '5_N3_13_훈독1.txt', name: 'N3 훈독 1' },
    { id: '5_N3_14_훈독2.txt', name: 'N3 훈독 2' },
    { id: '5_N3_15_훈독3.txt', name: 'N3 훈독 3' },
    { id: '5_N3_16_훈독4.txt', name: 'N3 훈독 4' },
    { id: '5_N3_17_훈독여러개.txt', name: 'N3 多훈독' },
  ],
  [
    { id: '5_N3_18_같은음독1.txt', name: 'N3 同음독 1' },
    { id: '5_N3_19_같은음독2.txt', name: 'N3 同음독 2' },
    { id: '5_N3_20_같은음독3.txt', name: 'N3 同음독 3' },
    { id: '5_N3_21_비슷한의미1.txt', name: 'N3 비슷한의미 1' },
    { id: '5_N3_22_비슷한의미2.txt', name: 'N3 비슷한의미 2' },
    { id: '5_N3_23_비슷한의미3.txt', name: 'N3 비슷한의미 3' },
    { id: '5_N3_24_닮은꼴1.txt', name: 'N3 닮은꼴 1' },
    { id: '5_N3_25_닮은꼴2.txt', name: 'N3 닮은꼴 2' },
    { id: '5_N3_26_닮은꼴3.txt', name: 'N3 닮은꼴 3' },
    { id: '5_N3_27_닮은꼴4.txt', name: 'N3 닮은꼴 4' },
    { id: '5_N3_28_닮은꼴5.txt', name: 'N3 닮은꼴 5' },
  ],
  [
    { id: '5_N3_29_명사1.txt', name: 'N3 명사 1' },
    { id: '5_N3_30_명사2.txt', name: 'N3 명사 2' },
    { id: '5_N3_31_명사3.txt', name: 'N3 명사 3' },
    { id: '5_N3_32_명사4.txt', name: 'N3 명사 4' },
    { id: '5_N3_33_명사5.txt', name: 'N3 명사 5' },
    { id: '5_N3_34_명사6.txt', name: 'N3 명사 6' },
    { id: '5_N3_35_명사7.txt', name: 'N3 명사 7' },
    { id: '5_N3_36_명사8.txt', name: 'N3 명사 8' },
    { id: '5_N3_37_명사9.txt', name: 'N3 명사 9' },
    { id: '5_N3_38_명사10.txt', name: 'N3 명사 10' },
    { id: '5_N3_39_동사1.txt', name: 'N3 동사 1' },
    { id: '5_N3_40_동사2.txt', name: 'N3 동사 2' },
    { id: '5_N3_41_동사3.txt', name: 'N3 동사 3' },
    { id: '5_N3_42_복합동사1.txt', name: 'N3 복합동사 1' },
    { id: '5_N3_43_복합동사2.txt', name: 'N3 복합동사 2' },
    { id: '5_N3_44_い형용사.txt', name: 'N3 い형용사' },
    { id: '5_N3_45_な형용사.txt', name: 'N3 な형용사' },
    { id: '5_N3_46_부사.txt', name: 'N3 부사' },
  ],
  [
    { id: '2_민나교재_1-10과.txt', name: '민나교재 1~10과' },
    { id: '2_민나교재_11-14과.txt', name: '민나교재 11~14과' },
    { id: '2_민나교재_15-17과.txt', name: '민나교재 15~17과' },
    { id: '2_민나교재_18-19과.txt', name: '민나교재 18~19과' },
  ],
  [
    { id: '3_민나문제_1-10과.txt', name: '민나문제 1~10과' },
    { id: '3_민나문제_11-19과.txt', name: '민나문제 11~19과' },
  ],
];

const JOAYO_GROUPS = [
  [
    { id: '1_좋아요下_01.txt', name: '下 - 1과' },
    { id: '1_좋아요下_02.txt', name: '下 - 2과' },
    { id: '1_좋아요下_03.txt', name: '下 - 3과' },
    { id: '1_좋아요下_04.txt', name: '下 - 4과' },
    { id: '1_좋아요下_05.txt', name: '下 - 5과' },
    { id: '1_좋아요下_06.txt', name: '下 - 6과' },
    { id: '1_좋아요下_07.txt', name: '下 - 7과' },
    { id: '1_좋아요下_08.txt', name: '下 - 8과' },
    { id: '1_좋아요下_09.txt', name: '下 - 9과' },
    { id: '1_좋아요下_10.txt', name: '下 - 10과' },
    { id: '1_좋아요下_11.txt', name: '下 - 11과' },
    { id: '1_좋아요下_12.txt', name: '下 - 12과' },
    { id: '1_좋아요下_13.txt', name: '下 - 13과' },
    { id: '1_좋아요下_14.txt', name: '下 - 14과' },
    { id: '1_좋아요下_15.txt', name: '下 - 15과' },
    { id: '1_좋아요下_16.txt', name: '下 - 16과' },
    { id: '1_좋아요下_17.txt', name: '下 - 17과' },
    { id: '1_좋아요下_18.txt', name: '下 - 18과' },
    { id: '1_좋아요下_19.txt', name: '下 - 19과' },
    { id: '1_좋아요下_20.txt', name: '下 - 20과' },
  ],
  [
    { id: '4_좋아요4_01.txt', name: '4 - 1과' },
    { id: '4_좋아요4_02.txt', name: '4 - 2과' },
    { id: '4_좋아요4_03.txt', name: '4 - 3과' },
    { id: '4_좋아요4_04.txt', name: '4 - 4과' },
    { id: '4_좋아요4_05.txt', name: '4 - 5과' },
    { id: '4_좋아요4_06.txt', name: '4 - 6과' },
    { id: '4_좋아요4_07.txt', name: '4 - 7과' },
    { id: '4_좋아요4_08.txt', name: '4 - 8과' },
    { id: '4_좋아요4_09.txt', name: '4 - 9과' },
    { id: '4_좋아요4_10.txt', name: '4 - 10과' },
    { id: '4_좋아요4_11.txt', name: '4 - 11과' },
    { id: '4_좋아요4_12.txt', name: '4 - 12과' },
    { id: '4_좋아요4_13.txt', name: '4 - 13과' },
    { id: '4_좋아요4_14.txt', name: '4 - 14과' },
    { id: '4_좋아요4_15.txt', name: '4 - 15과' },
    { id: '4_좋아요4_16.txt', name: '4 - 16과' },
    { id: '4_좋아요4_17.txt', name: '4 - 17과' },
    { id: '4_좋아요4_18.txt', name: '4 - 18과' },
    { id: '4_좋아요4_19.txt', name: '4 - 19과' },
    { id: '4_좋아요4_20.txt', name: '4 - 20과' },
  ],
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
      case 'joayo':
        return 'JOAYO';
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

      {category === 'joayo' && (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {JOAYO_GROUPS.map((group, groupIdx) => (
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