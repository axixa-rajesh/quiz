import React, { useState, useEffect } from "react";
import {
  Button,
  StatusBadge,
  PageHeader,
  Table,
  Modal,
} from "../components/UIComponents";

import { getResults } from "../services/api";
import { RefreshCw, Search, Eye } from "lucide-react";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Fetch quiz results
  const fetchResultsData = async () => {
    setLoading(true);

    try {
      const data = await getResults();

      console.log("Quiz Results Response:", data);

      const resultData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
        ? data.results
        : [];

      setResults(resultData);
    } catch (err) {
      console.error("Results Fetch Error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  // Open review modal
  const handleOpenReview = (result) => {
    setSelectedResult(result);
    setIsReviewModalOpen(true);
  };

  // Search / filter results
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
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Page Header */}
      <PageHeader
        title="Quiz Results & Answer Review"
        eyebrow="STUDENT 1 - RESULTS & REVIEW"
        action={
          <Button variant="primary" onClick={fetchResultsData}>
            <RefreshCw size={16} />
            Refresh
          </Button>
        }
      />

      {/* Search */}
      <div
        style={{
          background: "#FFF",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #E9D5FF",
          position: "relative",
        }}
      >
        <Search
          size={18}
          style={{
            position: "absolute",
            left: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#8B5CF6",
          }}
        />

        <input
          type="text"
          placeholder="Search student name or quiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 10px 10px 40px",
            borderRadius: "8px",
            border: "1px solid #C084FC",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Results Table */}
      <div
        style={{
          background: "#FFF",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #E9D5FF",
        }}
      >
        {loading ? (
          <p>Loading results...</p>
        ) : filteredResults.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            No quiz results found.
          </p>
        ) : (
          <Table
            headers={[
              "Student Name",
              "Quiz Title",
              "Score",
              "Status",
              "Action",
            ]}
          >
            {filteredResults.map((r, idx) => (
              <tr
                key={r.attemptId || r.id || idx}
                style={{
                  borderBottom: "1px solid #E9D5FF",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "600",
                  }}
                >
                  {r.studentName || r.student || "N/A"}
                </td>

                <td style={{ padding: "12px" }}>
                  {r.quizTitle || r.quiz || "N/A"}
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color: "#8B5CF6",
                  }}
                >
                  {r.score ?? `${r.totalScore || 0}/${r.maxScore || 10}`}
                </td>

                <td style={{ padding: "12px" }}>
                  <StatusBadge status={r.status || "Completed"} />
                </td>

                <td style={{ padding: "12px" }}>
                  <Button
                    variant="secondary"
                    onClick={() => handleOpenReview(r)}
                  >
                    <Eye size={16} />
                    Review Sheet
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Review Modal */}
      {selectedResult && (
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title={`Scorecard Review - ${
            selectedResult.studentName || selectedResult.student || "Student"
          }`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: "#F4F0FA",
                padding: "16px",
                borderRadius: "10px",
              }}
            >
              <h4>Score Breakdown</h4>

              <p>
                Score:{" "}
                <strong>
                  {selectedResult.score ??
                    `${selectedResult.totalScore || 0}/${
                      selectedResult.maxScore || 10
                    }`}
                </strong>
              </p>

              <p>
                Status:{" "}
                <strong>
                  {selectedResult.status || "Completed"}
                </strong>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => setIsReviewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Results;