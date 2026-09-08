import React, { useState } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "JavaScript", code: "JS-101", topicsCount: 5, quizzesCount: 8 },
    { id: 2, name: "Database Management System", code: "DBMS-201", topicsCount: 4, quizzesCount: 6 },
    { id: 3, name: "Computer Networks", code: "CN-301", topicsCount: 6, quizzesCount: 5 },
  ]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!name || !code) return;
    setSubjects([
      ...subjects,
      { id: Date.now(), name, code, topicsCount: 0, quizzesCount: 0 },
    ]);
    setName("");
    setCode("");
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ACADEMICS</p>
          <h1>Subjects</h1>
          <p className="page-description">Manage main subjects and course categories.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* ADD SUBJECT FORM */}
        <div className="card">
          <h3>Add New Subject</h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
            Create a category to group topics and questions.
          </p>

          <form onSubmit={handleAddSubject}>
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                placeholder="e.g. Operating Systems"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Subject Code</label>
              <input
                type="text"
                placeholder="e.g. OS-401"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "10px" }}>
              + Add Subject
            </button>
          </form>
        </div>

        {/* SUBJECTS LIST TABLE */}
        <div className="card">
          <h3>All Subjects</h3>
          <div className="table-wrapper" style={{ marginTop: "12px" }}>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th>Topics</th>
                  <th>Quizzes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub.id}>
                    <td><span className="role-badge">{sub.code}</span></td>
                    <td><strong>{sub.name}</strong></td>
                    <td>{sub.topicsCount}</td>
                    <td>{sub.quizzesCount}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(sub.id)}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;