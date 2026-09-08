import React, { useState } from "react";

function QuestionBank() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Which of the following is used to handle async operations in ES6?",
      subject: "JavaScript",
      topic: "Promises & Async/Await",
      type: "MCQ",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What is the primary key in a SQL database table used for?",
      subject: "Database Management System",
      topic: "Normalization & SQL Join",
      type: "MCQ",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Which OSI layer is responsible for routing packets?",
      subject: "Computer Networks",
      topic: "TCP/IP Protocol Layer",
      type: "MCQ",
      difficulty: "Hard",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    subject: "JavaScript",
    topic: "",
    difficulty: "Easy",
    type: "MCQ",
  });

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question) return;

    setQuestions([
      { id: Date.now(), ...newQuestion },
      ...questions,
    ]);
    setShowModal(false);
    setNewQuestion({
      question: "",
      subject: "JavaScript",
      topic: "",
      difficulty: "Easy",
      type: "MCQ",
    });
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">QUESTION REPOSITORY</p>
          <h1>Question Bank</h1>
          <p className="page-description">
            Create and organize questions across different subjects and topics.
          </p>
        </div>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add Question
        </button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div>
            <h3>All Questions ({filteredQuestions.length})</h3>
            <p>Filter questions by title or subject</p>
          </div>
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <tr key={q.id}>
                    <td style={{ maxWidth: "320px" }}>
                      <strong>{q.question}</strong>
                    </td>
                    <td>
                      <span className="role-badge">{q.subject}</span>
                    </td>
                    <td>{q.topic || "General"}</td>
                    <td>
                      <span
                        className={
                          q.difficulty === "Easy"
                            ? "status published"
                            : q.difficulty === "Medium"
                            ? "status scheduled"
                            : "status draft"
                        }
                      >
                        <span className="status-dot"></span>
                        {q.difficulty}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(q.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD QUESTION MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Question</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddQuestion}>
              <div className="form-group">
                <label>Question Text</label>
                <input
                  type="text"
                  required
                  placeholder="Enter the question sentence..."
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select
                  value={newQuestion.subject}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, subject: e.target.value })
                  }
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Database Management System">
                    Database Management System
                  </option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>
              </div>
              <div className="form-group">
                <label>Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Promises / SQL Joins"
                  value={newQuestion.topic}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, topic: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={newQuestion.difficulty}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, difficulty: e.target.value })
                  }
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionBank;