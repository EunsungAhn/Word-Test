import React, { useState, useEffect } from "react";
import TOEICQuiz from "./TOEICQuiz";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const correctPassword = "dmstjd";
  const EXPIRATION_TIME = 60 * 60 * 1000; // 1시간 (밀리초)

  useEffect(() => {
    const savedTime = localStorage.getItem("loginTime");
    if (savedTime && Date.now() - parseInt(savedTime) < EXPIRATION_TIME) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (inputPassword === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem("loginTime", Date.now().toString());
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>비밀번호를 입력하세요</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="비밀번호"
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          확인
        </button>
      </div>
    );
  }

  return <TOEICQuiz />;
}
