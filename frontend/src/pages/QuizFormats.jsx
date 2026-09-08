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

const QuizFormats = () => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "Multiple Choice",
    duration: 30,
    passingMarks: 40,
    negativeMarking: "No",
    status: "Active"
  });

  // 1. FETCH QUIZ FORMATS (GET API)
  const fetchFormats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/quiz-formats`);
      const data = await res.json();
      setFormats(data);
    } catch (err) {
      console.error("Failed to fetch formats:", err);
      setFormats([
        { id: 1, title: "Standard MCQ Test", type: "Multiple Choice", duration: 30, passingMarks: 40, negativeMarking: "No", status: "Active" },
        { id: 2, title: "Speed Quiz", type: "Timed Test", duration: 10, passingMarks: 60, negativeMarking: "Yes (-0.25)", status: "Active" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormats();
  }, []);

  // 2. CREATE / EDIT (POST / PUT API)
  const handleSubmit = async () => {
    if (!formData.title.trim()) return;
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE}/quiz-formats/${editingId}` : `${API_BASE}/quiz-formats`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      fetchFormats();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving quiz format:", err);
    }
  };

  // 3. TOGGLE STATUS (PATCH API)
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await fetch(`${API_BASE}/quiz-formats/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      setFormats(formats.map(f => f.id === id ? { ...f, status: newStatus } : f));
    } catch (err) {
      console.error("Status toggle failed:", err);
    }
  };

  const handleEditClick = (format) => {
    setEditingId(format.id);
    setFormData({ ...format });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      type: "Multiple Choice",
      duration: 30,
      passingMarks: 40,
      negativeMarking: "No",
      status: "Active"
    });
  };

  const filteredFormats = formats.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <PageHeader 
        title="Quiz Formats & Rules" 
        eyebrow="STUDENT 1 - DAY 9 TASK" 
        action={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Create New Format
          </Button>
        } 
      />

      <div style={{ background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
        <Input 
          label="Search Quiz Format" 
          placeholder="Search format title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="card" style={{ background: "#FFF", padding: "16px", borderRadius: "12px" }}>
        {loading ? (
          <p>Loading Quiz Formats...</p>
        ) : (
          <Table headers={["Format Title", "Type", "Duration", "Passing %", "Status", "Actions"]}>
            {filteredFormats.map((fmt) => (
              <tr key={fmt.id} style={{ borderBottom: "1px solid #E9D5FF" }}>
                <td style={{ padding: "12px", fontWeight: "600" }}>{fmt.title}</td>
                <td style={{ padding: "12px" }}>{fmt.type}</td>
                <td style={{ padding: "12px" }}>{fmt.duration} Mins</td>
                <td style={{ padding: "12px" }}>{fmt.passingMarks}%</td>
                <td style={{ padding: "12px" }}><StatusBadge status={fmt.status} /></td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  <Button variant="secondary" onClick={() => { setSelectedFormat(fmt); setIsPreviewOpen(true); }}>Rule Preview</Button>
                  <Button variant="secondary" onClick={() => handleEditClick(fmt)}>Edit</Button>
                  <Button 
                    variant={fmt.status === "Active" ? "danger" : "primary"} 
                    onClick={() => handleToggleStatus(fmt.id, fmt.status)}
                  >
                    {fmt.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? "Edit Format" : "Create Format"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
          <Input 
            label="Format Title" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          />
          <Select 
            label="Format Type" 
            options={["Multiple Choice", "Timed Test", "True/False", "Subjective"]} 
            value={formData.type} 
            onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
          />
          <Input 
            label="Duration (mins)" 
            type="number"
            value={formData.duration} 
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
          />
          <Input 
            label="Passing Marks (%)" 
            type="number"
            value={formData.passingMarks} 
            onChange={(e) => setFormData({ ...formData, passingMarks: e.target.value })} 
          />
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" }}>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>{editingId ? "Update" : "Save Format"}</Button>
          </div>
        </div>
      </Modal>

      {/* RULE PREVIEW MODAL */}
      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Format Rules Preview">
        {selectedFormat && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
            <div style={{ padding: "16px", background: "#F4F0FA", borderRadius: "10px" }}>
              <h3 style={{ margin: "0 0 8px 0" }}>{selectedFormat.title}</h3>
              <p><strong>Type:</strong> {selectedFormat.type}</p>
              <p><strong>Duration:</strong> {selectedFormat.duration} Minutes</p>
              <p><strong>Passing Score:</strong> {selectedFormat.passingMarks}%</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuizFormats;