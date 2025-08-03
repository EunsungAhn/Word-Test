import React, { useState, useEffect } from "react";

const parseWordList = (raw) => {
  return raw
    .split("\n")
    .map((line) => line.split("\t"))
    .filter(([eng, kor]) => eng && kor);
};

const shuffle = (array) => {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};

export default function TOEICQuiz() {
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState("day_1");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(`/${selectedDay}.txt`)
      .then((res) => res.text())
      .then((text) => {
        const list = shuffle(parseWordList(text));
        setWordList(list);
        setCurrentIndex(0);
        setShowAnswer(false);
      });
  }, [selectedDay]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  if (wordList.length === 0) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>로딩 중...</div>;
  }

  if (currentIndex >= wordList.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.5rem" }}>
        퀴즈 종료! 총 {wordList.length}문제를 모두 확인했습니다.
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="day-select">Day 선택: </label>
        <select id="day-select" value={selectedDay} onChange={handleDayChange}>
          {[...Array(30)].map((_, i) => (
            <option key={i} value={`day_${i + 1}`}>
              Day {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        {wordList[currentIndex][0]} ({currentIndex + 1}/{wordList.length})
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={showAnswer ? handleNext : handleShowAnswer}
          style={{ flex: 1, padding: "0.75rem", fontSize: "1rem" }}
        >
          {showAnswer ? "다음" : "정답 확인"}
        </button>
      </div>

      {showAnswer && (
        <div
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginTop: "0.75rem",
          }}
        >
          정답: {wordList[currentIndex][1]}
        </div>
      )}
    </div>
  );
}
