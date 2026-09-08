import React, { useState, useEffect } from "react";
import { Button, StatusBadge, PageHeader, Table, Modal } from "../components/UIComponents";
import { getResults } from "../services/api";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const fetchResultsData = async () => {
    setLoading(true);
    try {
      const data = await getResults();
      setResults(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  const handleOpenReview = (result) => {
    setSelectedResult(result);
    setIsReviewModalOpen(true);
  };

  // SAFE FILTER LOGIC (Prevents undefined toLowerCase crash)
  const filteredResults = results.filter((r) => {
    const studentName = r?.studentName || r?.student || "";
    const quizTitle = r?.quizTitle || r?.quiz || "";
    const query = searchTerm.toLowerCase();

    return (
      studentName.toLowerCase().includes(query) ||
      quizTitle.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title="Quiz Results & Answer Review"
        eyebrow="STUDENT 1 - RESULTS & REVIEW"
        action={
          <Button variant="primary" onClick={fetchResultsData}>
            🔄 Refresh
          </Button>
        }
      />

      <div style={{ background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
        <input
          type="text"
          placeholder="🔍 Search student name or quiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #C084FC", outline: "none" }}
        />
      </div>

      <div style={{ background: "#FFF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
        {loading ? (
          <p>Loading results...</p>
        ) : (
          <Table headers={["Student Name", "Quiz Title", "Score", "Status", "Action"]}>
            {filteredResults.map((r, idx) => (
              <tr key={r.id || idx} style={{ borderBottom: "1px solid #E9D5FF" }}>
                <td style={{ padding: "12px", fontWeight: "600" }}>{r.studentName || r.student || "N/A"}</td>
                <td style={{ padding: "12px" }}>{r.quizTitle || r.quiz || "N/A"}</td>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#8B5CF6" }}>
                  {r.score || `${r.totalScore || 0}/${r.maxScore || 10}`}
                </td>
                <td style={{ padding: "12px" }}>
                  <StatusBadge status={r.status || "Completed"} />
                </td>
                <td style={{ padding: "12px" }}>
                  <Button variant="secondary" onClick={() => handleOpenReview(r)}>
                    👁️ Review Sheet
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {selectedResult && (
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title={`Scorecard Review - ${selectedResult.studentName || selectedResult.student}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#F4F0FA", padding: "16px", borderRadius: "10px" }}>
              <h4>Score Breakdown</h4>
              <p>Score: <strong>{selectedResult.score || `${selectedResult.totalScore}/${selectedResult.maxScore}`}</strong></p>
              <p>Status: <strong>{selectedResult.status}</strong></p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setIsReviewModalOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Results;