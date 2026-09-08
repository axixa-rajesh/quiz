import React from "react";

function Reports() {
  const reportsSummary = [
    { title: "Total Quizzes Taken", value: "1,240", change: "↑ 14% vs last month", color: "purple" },
    { title: "Avg. Completion Rate", value: "88.5%", change: "↑ 3.2% vs last month", color: "green" },
    { title: "Active Test Takers", value: "450", change: "↑ 8% vs last month", color: "orange" },
    { title: "Overall Pass Rate", value: "76.2%", change: "↓ 1.5% vs last month", color: "blue" },
  ];

  const topCategories = [
    { subject: "JavaScript", attempts: 520, passRate: "82%" },
    { subject: "Database Management System", attempts: 380, passRate: "79%" },
    { subject: "Computer Networks", attempts: 340, passRate: "68%" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ANALYTICS & INSIGHTS</p>
          <h1>System Reports</h1>
          <p className="page-description">
            Comprehensive overview of quiz metrics and student progress.
          </p>
        </div>
        <button className="primary-btn">↓ Download PDF Report</button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="stats-grid">
        {reportsSummary.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className={`stat-icon ${item.color}`}>▥</div>
            <div>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <small style={{ color: "var(--text-muted)", fontSize: "11px" }}>{item.change}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* SUBJECT PERFORMANCE */}
        <div className="card">
          <div className="card-header">
            <h3>Subject Wise Performance</h3>
            <p>Overall accuracy per subject</p>
          </div>
          <div className="table-wrapper" style={{ marginTop: "12px" }}>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Attempts</th>
                  <th>Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((cat, i) => (
                  <tr key={i}>
                    <td><strong>{cat.subject}</strong></td>
                    <td>{cat.attempts}</td>
                    <td><strong className="score-value">{cat.passRate}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* METRICS SUMMARY */}
        <div className="card">
          <div className="card-header">
            <h3>Report Summary</h3>
            <p>Key highlights</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            <div className="list-item">
              <div className="item-info">
                <strong>Highest Passing Subject</strong>
                <p>JavaScript (82% Pass Rate)</p>
              </div>
            </div>
            <div className="list-item">
              <div className="item-info">
                <strong>Most Active Day</strong>
                <p>Wednesday (Peak 180 tests)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;