import React from "react";

export default function DaySelector({ onSelectDay }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Day 선택</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
          >
            Day {day}
          </button>
        ))}
      </div>
    </div>
  );
}