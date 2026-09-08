import React, { useState } from "react";
import { Button, PageHeader, TimerDisplay } from "../components/UIComponents";

const dummyQuiz = {
  title: "Frontend Development Practice Test",
  duration: 600, // 10 minutes
  questions: [
    { id: 1, text: "What is React JS?", options: ["A Library", "A Framework", "A Language", "A DB"] },
    { id: 2, text: "Which keyword defines constant in JS?", options: ["var", "let", "const", "static"] },
    { id: 3, text: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON Extended", "Style Sheet"] }
  ]
};

const QuizAttempt = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQ = dummyQuiz.questions[currentIdx];

  const handleSelectOption = (optIdx) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      <PageHeader 
        title={dummyQuiz.title} 
        eyebrow="STUDENT 3 - DAY 9 TASK" 
        action={<TimerDisplay seconds={dummyQuiz.duration} />} 
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "20px" }}>
        {/* Question Area */}
        <div style={{ background: "#FFF", padding: "24px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
          <p style={{ fontWeight: "bold", color: "#8B5CF6", margin: "0 0 10px 0" }}>Question {currentIdx + 1} of {dummyQuiz.questions.length}</p>
          <h3 style={{ margin: "0 0 20px 0" }}>{currentQ.text}</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: isSelected ? "2px solid #8B5CF6" : "1px solid #E9D5FF",
                    background: isSelected ? "#F3E8FF" : "#FFF",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
            <Button variant="secondary" disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>
              Previous
            </Button>
            <Button variant="primary" disabled={currentIdx === dummyQuiz.questions.length - 1} onClick={() => setCurrentIdx(prev => prev + 1)}>
              Next
            </Button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div style={{ background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF", height: "fit-content" }}>
          <h4 style={{ margin: "0 0 12px 0" }}>Questions</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {dummyQuiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: currentIdx === idx ? "2px solid #8B5CF6" : "none",
                  background: answers[idx] !== undefined ? "#C084FC" : "#E2E8F0",
                  color: answers[idx] !== undefined ? "#FFF" : "#000",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;