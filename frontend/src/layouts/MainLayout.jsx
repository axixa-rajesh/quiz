import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "⌂" },
    { name: "Users", path: "/users", icon: "♙" },
    { name: "Subjects", path: "/subjects", icon: "▣" },
    { name: "Topics", path: "/topics", icon: "◇" },
    { name: "Question Bank", path: "/questions", icon: "☷" },
    { name: "Quiz Formats", path: "/quiz-formats", icon: "▤" },
    { name: "Quizzes", path: "/quizzes", icon: "◈" },
    { name: "Results", path: "/results", icon: "◒" },
    { name: "Reports", path: "/reports", icon: "▥" },
    {name:"Settings", path:"/settings",icon:"⚙"}
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">Q</div>
          {!collapsed && (
            <div>
              <h2>Quizly</h2>
              <span>Management System</span>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          {!collapsed && <p className="menu-title">MAIN MENU</p>}

          <nav>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && (
                  <span className="nav-text">{item.name}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={logout}>
            <span className="nav-icon">↪</span>
            {!collapsed && <span className="nav-text">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-area">
        {/* TOP NAVBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-toggle"
              onClick={() => setCollapsed(!collapsed)}
            >
              ☰
            </button>

            <div className="search-box">
              <span>⌕</span>
              <input type="text" placeholder="Search anything..." />
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-button">♢</button>

            <button className="icon-button notification">
              ♧
              <span></span>
            </button>

            <div className="profile">
              <div className="avatar">KS</div>
              <div className="profile-info">
                <strong>Admin User</strong>
                <small>Administrator</small>
              </div>
              <span className="profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;