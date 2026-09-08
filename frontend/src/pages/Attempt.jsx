import React, { useState, useEffect } from "react";
import { Button, PageHeader, TimerDisplay, StatusBadge, Modal } from "../components/UIComponents";

const dummyQuizData = {
  id: 101,
  title: "React Fundamentals Test",
  duration: 300, // 5 Mins in seconds
  questions: [
    { id: 1, text: "What is JSX in React?", options: ["JS Extension", "CSS Library", "Database", "Hook"], correct: 0 },
    { id: 2, text: "Which hook manages state?", options: ["useEffect", "useState", "useRef", "useMemo"], correct: 1 },
    { id: 3, text: "Props are mutable in child component?", options: ["True", "False"], correct: 1 }
  ]
};

const Attempt = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewMarkers, setReviewMarkers] = useState({});
  const [timeLeft, setTimeLeft] = useState(dummyQuizData.duration);
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);

  // 1. TIMER LOGIC & AUTO-SUBMIT ON EXPIRE
  useEffect(() => {
    if (isSubmitted) return;
    if (timeLeft <= 0) {
      handleCalculateAndSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  // 2. OPTION SELECT & REVIEW TOGGLE
  const handleSelectOption = (optionIdx) => {
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  };

  const toggleReviewMark = (idx) => {
    setReviewMarkers({ ...reviewMarkers, [idx]: !reviewMarkers[idx] });
  };

  // 3. SUBMIT & RESULT HANDOFF LOGIC
  const handleCalculateAndSubmit = () => {
    let score = 0;
    dummyQuizData.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score += 1;
      }
    });

    const percentage = Math.round((score / dummyQuizData.questions.length) * 100);
    const summary = {
      totalQuestions: dummyQuizData.questions.length,
      attemptedCount: Object.keys(answers).length,
      correctCount: score,
      percentage,
      status: percentage >= 50 ? "Passed" : "Failed"
    };

    setResultSummary(summary);
    setIsSubmitted(true);
    setIsConfirmModalOpen(false);
  };

  const currentQ = dummyQuizData.questions[currentIdx];

  // RESULT SUMMARY HANDOFF VIEW
  if (isSubmitted && resultSummary) {
    return (
      <div style={{ padding: "32px", maxWidth: "600px", margin: "40px auto", background: "#FFF", borderRadius: "16px", border: "1px solid #E9D5FF", textAlign: "center" }}>
        <h2 style={{ color: "#1E1B4B", margin: 0 }}>🎉 Quiz Submitted Successfully!</h2>
        <p style={{ color: "#64748B", marginTop: "8px" }}>Here is your performance result summary:</p>

        <div style={{ margin: "24px 0", padding: "20px", background: "#F4F0FA", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h1 style={{ fontSize: "40px", color: "#8B5CF6", margin: 0 }}>{resultSummary.percentage}%</h1>
          <StatusBadge status={resultSummary.status} />
          <hr style={{ border: "none", borderTop: "1px solid #E9D5FF", margin: "10px 0" }} />
          <p style={{ margin: "4px 0" }}><strong>Total Questions:</strong> {resultSummary.totalQuestions}</p>
          <p style={{ margin: "4px 0" }}><strong>Attempted:</strong> {resultSummary.attemptedCount}</p>
          <p style={{ margin: "4px 0" }}><strong>Correct Answers:</strong> {resultSummary.correctCount}</p>
        </div>

        <Button variant="primary" onClick={() => window.location.href = "/quizzes"}>
          Return to Quizzes
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      <PageHeader
        title={dummyQuizData.title}
        eyebrow="LIVE ATTEMPT ENGINE"
        action={<TimerDisplay seconds={timeLeft} />}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "20px" }}>
        {/* QUESTION CARD */}
        <div style={{ background: "#FFF", padding: "24px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontWeight: "bold", color: "#8B5CF6" }}>Question {currentIdx + 1} of {dummyQuizData.questions.length}</span>
            <Button variant="secondary" onClick={() => toggleReviewMark(currentIdx)}>
              {reviewMarkers[currentIdx] ? "📌 Unmark Review" : "🔖 Mark for Review"}
            </Button>
          </div>

          <h3 style={{ margin: "0 0 20px 0", color: "#1E1B4B" }}>{currentQ.text}</h3>

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
                    cursor: "pointer",
                    fontWeight: isSelected ? "600" : "400"
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
            <Button variant="secondary" disabled={currentIdx === 0} onClick={() => setCurrentIdx((prev) => prev - 1)}>
              Previous
            </Button>
            {currentIdx < dummyQuizData.questions.length - 1 ? (
              <Button variant="primary" onClick={() => setCurrentIdx((prev) => prev + 1)}>
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setIsConfirmModalOpen(true)}>
                Submit Quiz
              </Button>
            )}
          </div>
        </div>

        {/* QUESTION PALETTE SIDEBAR */}
        <div style={{ background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF", height: "fit-content" }}>
          <h4 style={{ margin: "0 0 12px 0" }}>Question Palette</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {dummyQuizData.questions.map((_, idx) => {
              const isAns = answers[idx] !== undefined;
              const isRev = reviewMarkers[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: currentIdx === idx ? "2px solid #8B5CF6" : "none",
                    background: isRev ? "#F59E0B" : isAns ? "#C084FC" : "#E2E8F0",
                    color: (isAns || isRev) ? "#FFF" : "#000",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONFIRM SUBMISSION MODAL */}
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Submission">
        <p>Are you sure you want to submit your quiz?</p>
        <p><strong>Attempted:</strong> {Object.keys(answers).length} / {dummyQuizData.questions.length}</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>Continue Test</Button>
          <Button variant="primary" onClick={handleCalculateAndSubmit}>Yes, Submit Now</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Attempt;