import React, { useState } from "react";

function Topics() {
  const [topics, setTopics] = useState([
    { id: 1, title: "Promises & Async/Await", subject: "JavaScript", questions: 12 },
    { id: 2, title: "Normalization & SQL Join", subject: "Database Management System", questions: 18 },
    { id: 3, title: "TCP/IP Protocol Layer", subject: "Computer Networks", questions: 10 },
  ]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("JavaScript");

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!title) return;
    setTopics([...topics, { id: Date.now(), title, subject, questions: 0 }]);
    setTitle("");
  };

  const handleDelete = (id) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ACADEMICS</p>
          <h1>Topics</h1>
          <p className="page-description">Organize chapter topics under specific subjects.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* ADD TOPIC FORM */}
        <div className="card">
          <h3>Add New Topic</h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
            Map sub-topics directly under a parent subject.
          </p>

          <form onSubmit={handleAddTopic}>
            <div className="form-group">
              <label>Select Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="JavaScript">JavaScript</option>
                <option value="Database Management System">Database Management System</option>
                <option value="Computer Networks">Computer Networks</option>
              </select>
            </div>

            <div className="form-group">
              <label>Topic Title</label>
              <input
                type="text"
                placeholder="e.g. ES6 Higher Order Functions"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "10px" }}>
              + Add Topic
            </button>
          </form>
        </div>

        {/* TOPICS LIST */}
        <div className="card">
          <h3>Topic Mapping</h3>
          <div className="table-wrapper" style={{ marginTop: "12px" }}>
            <table>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Parent Subject</th>
                  <th>Questions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((top) => (
                  <tr key={top.id}>
                    <td><strong>{top.title}</strong></td>
                    <td><span className="role-badge">{top.subject}</span></td>
                    <td>{top.questions}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(top.id)}>✕</button>
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

export default Topics;