import React, { useState, useEffect } from "react";
import { 
  Button, 
  Input, 
  Select, 
  StatusBadge, 
  PageHeader, 
  Table, 
  Modal 
} from "../components/UIComponents";

const API_BASE = "http://localhost:5000/api";

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "Math",
    topic: "",
    status: "Active"
  });

  // 1. FETCH QUESTIONS
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/questions`);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 2. CREATE / EDIT QUESTION
  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE}/questions/${editingId}` : `${API_BASE}/questions`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      fetchQuestions();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  // 3. TOGGLE STATUS
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await fetch(`${API_BASE}/questions/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      setQuestions(questions.map(q => q.id === id ? { ...q, status: newStatus } : q));
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleEditClick = (question) => {
    setEditingId(question.id);
    setFormData({
      title: question.title,
      subject: question.subject,
      topic: question.topic,
      status: question.status
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", subject: "Math", topic: "", status: "Active" });
  };

  // 4. SEARCH & FILTER LOGIC
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "All" || q.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <PageHeader 
        title="Question Bank Management" 
        eyebrow="DAY 8 API INTEGRATION" 
        action={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Add Question
          </Button>
        } 
      />

      {/* SEARCH & FILTER CONTROLS */}
      <div style={{ display: "flex", gap: "16px", background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color, #E9D5FF)" }}>
        <Input 
          label="Search Questions" 
          placeholder="Search by text..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Select 
          label="Filter by Subject" 
          options={["All", "Math", "Science", "English"]} 
          value={subjectFilter} 
          onChange={(e) => setSubjectFilter(e.target.value)} 
        />
      </div>

      {/* QUESTION BANK TABLE */}
      <div className="card" style={{ background: "#FFF", padding: "16px", borderRadius: "12px" }}>
        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading questions from server...</p>
        ) : (
          <Table headers={["Question Title", "Subject", "Topic", "Status", "Actions"]}>
            {filteredQuestions.map((q) => (
              <tr key={q.id} style={{ borderBottom: "1px solid #E9D5FF" }}>
                <td style={{ padding: "12px", fontWeight: "600" }}>{q.title}</td>
                <td style={{ padding: "12px" }}>{q.subject}</td>
                <td style={{ padding: "12px" }}>{q.topic}</td>
                <td style={{ padding: "12px" }}>
                  <StatusBadge status={q.status} />
                </td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  <Button variant="secondary" onClick={() => handleEditClick(q)}>Edit</Button>
                  <Button 
                    variant={q.status === "Active" ? "danger" : "primary"} 
                    onClick={() => handleToggleStatus(q.id, q.status)}
                  >
                    {q.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? "Edit Question" : "Create Question"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
          <Input 
            label="Question Title" 
            placeholder="Enter question text" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          />
          <Select 
            label="Subject" 
            options={["Math", "Science", "English"]} 
            value={formData.subject} 
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
          />
          <Input 
            label="Topic Name" 
            placeholder="e.g. Algebra, Physics" 
            value={formData.topic} 
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })} 
          />
          
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" }}>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>{editingId ? "Update" : "Create"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionBankPage;