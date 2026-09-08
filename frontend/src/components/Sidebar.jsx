import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Users", path: "/users", icon: "👤" },
    { label: "Subjects", path: "/subjects", icon: "📚" },
    { label: "Topics", path: "/topics", icon: "📌" },
    { label: "Question Bank", path: "/question-bank", icon: "🗂️" },
    { label: "Quiz Formats", path: "/quiz-formats", icon: "📑" },
    { label: "Quizzes", path: "/quizzes", icon: "✨" },
    { label: "Results", path: "/results", icon: "🎯" },
    { label: "Reports", path: "/reports", icon: "📊" },
    { label: "Settings", path: "/settings", icon: "⚙️" }, // 👈 Settings Option Added
  ];

  return (
    <aside style={{ width: "240px", background: "#F5F3FF", minHeight: "100vh", padding: "16px", borderRight: "1px solid #E9D5FF" }}>
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <div style={{ background: "#7C3AED", color: "#FFF", width: "32px", height: "32px", borderRadius: "8px", display: "grid", placeItems: "center", fontWeight: "bold" }}>Q</div>
        <span style={{ fontWeight: "bold", fontSize: "18px", color: "#4C1D95" }}>Quizly</span>
      </div>

      <p style={{ fontSize: "11px", color: "#6B7280", fontWeight: "bold", marginBottom: "12px", letterSpacing: "0.5px" }}>MAIN MENU</p>

      {/* NAV LINKS */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "#7C3AED" : "#4B5563",
                background: isActive ? "#DDD6FE" : "transparent"
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })} 
      </nav>
    </aside>
  );
};

export default Sidebar;