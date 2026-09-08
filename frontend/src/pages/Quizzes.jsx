import React, { useState } from "react";
import { Button, Input, Select, PageHeader, Table } from "../components/UIComponents";

const Quizzes = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("Standard MCQ Test");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [publishDate, setPublishDate] = useState("");
  const [passingScore, setPassingScore] = useState(40);

  const [availableQuestions] = useState([
    { id: 101, title: "What is React State?", subject: "React", defaultMarks: 2 },
    { id: 102, title: "Explain JSX syntax", subject: "React", defaultMarks: 3 },
    { id: 103, title: "What is CSS Flexbox?", subject: "CSS", defaultMarks: 1 },
    { id: 104, title: "Difference between let and var", subject: "JS", defaultMarks: 2 },
  ]);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleToggleQuestion = (q) => {
    const exists = selectedQuestions.some((item) => item.id === q.id);
    if (exists) {
      setSelectedQuestions(selectedQuestions.filter((item) => item.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, { ...q, marks: q.defaultMarks }]);
    }
  };

  const handleMarksChange = (id, newMarks) => {
    setSelectedQuestions(
      selectedQuestions.map((q) =>
        q.id === id ? { ...q, marks: Number(newMarks) || 0 } : q
      )
    );
  };

  const filteredQuestions = availableQuestions.filter(
    (q) => selectedSubject === "All" || q.subject === selectedSubject
  );

  const totalQuestions = selectedQuestions.length;
  const totalMarks = selectedQuestions.reduce((sum, q) => sum + Number(q.marks), 0);

  // Pure Local Handler (No Network Request = No Fetch Error)
  const handlePublishQuiz = () => {
    if (!quizTitle.trim()) {
      alert("Please enter a Quiz Title!");
      return;
    }
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question!");
      return;
    }

    const payload = {
      title: quizTitle,
      format: selectedFormat,
      publishDate,
      passingScore,
      totalMarks,
      questions: selectedQuestions,
      status: "Published",
    };

    console.log("Quiz Data Published Locally:", payload);
    alert("🎉 Quiz Published Successfully (Frontend Mode)!");
  };

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title="Create & Publish Quiz"
        eyebrow="STUDENT 1 - DAY 11 TASK"
        action={
          <Button variant="primary" onClick={handlePublishQuiz}>
            🚀 Publish Quiz
          </Button>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#1E1B4B" }}>1. Basic Setup & Format</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Input
                label="Quiz Title"
                placeholder="e.g. Mid-Term Frontend Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
              <Select
                label="Select Quiz Format"
                options={["Standard MCQ Test", "Speed Quiz", "Subjective Exam"]}
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              />
            </div>
          </div>

          <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#1E1B4B" }}>2. Question Selector</h3>
              <div style={{ width: "200px" }}>
                <Select
                  label="Filter Subject"
                  options={["All", "React", "CSS", "JS"]}
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                />
              </div>
            </div>

            <Table headers={["Select", "Question Title", "Subject", "Marks Assigned"]}>
              {filteredQuestions.map((q) => {
                const isSelected = selectedQuestions.some((item) => item.id === q.id);
                const selectedItem = selectedQuestions.find((item) => item.id === q.id);

                return (
                  <tr key={q.id} style={{ borderBottom: "1px solid #E9D5FF" }}>
                    <td style={{ padding: "12px" }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleQuestion(q)}
                        style={{ cursor: "pointer", width: "18px", height: "18px" }}
                      />
                    </td>
                    <td style={{ padding: "12px", fontWeight: "600" }}>{q.title}</td>
                    <td style={{ padding: "12px" }}>{q.subject}</td>
                    <td style={{ padding: "12px" }}>
                      {isSelected ? (
                        <input
                          type="number"
                          value={selectedItem?.marks || ""}
                          onChange={(e) => handleMarksChange(q.id, e.target.value)}
                          style={{
                            width: "60px",
                            padding: "6px",
                            borderRadius: "6px",
                            border: "1px solid #C084FC"
                          }}
                        />
                      ) : (
                        <span style={{ color: "#94A3B8" }}>--</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>

          <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#1E1B4B" }}>3. Publish Schedule</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Input
                label="Publish Date & Time"
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
              <Input
                label="Passing Score (%)"
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E9D5FF", height: "fit-content" }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#1E1B4B" }}>📊 Quiz Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Format:</span>
              <strong>{selectedFormat}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Questions:</span>
              <strong style={{ color: "#8B5CF6" }}>{totalQuestions}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total Marks:</span>
              <strong style={{ color: "#8B5CF6" }}>{totalMarks} Marks</strong>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Button variant="primary" style={{ width: "100%" }} onClick={handlePublishQuiz}>
                Publish Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;