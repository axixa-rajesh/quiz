import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  ListChecks,
  FileQuestion,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Bell,
  ChevronDown,
} from "lucide-react";

function MainLayout() {
  const [notificationsOpen,setNotificationsOpen]=useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      name: "Topics",
      path: "/topics",
      icon: Layers,
    },
    {
      name: "Question Bank",
      path: "/questions",
      icon: ListChecks,
    },
    {
      name: "Quiz Formats",
      path: "/quiz-formats",
      icon: FileQuestion,
    },
    {
      name: "Quizzes",
      path: "/quizzes",
      icon: ClipboardList,
    },
    {
      name: "Results",
      path: "/results",
      icon: BarChart3,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      name: "Gen AI",
      path: "/gen-ai",
      icon: Sparkles,
    },
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
        
        {/* BRAND */}
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
          {!collapsed && (
            <p className="menu-title">MAIN MENU</p>
          )}

          <nav>
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                  title={collapsed ? item.name : ""}
                >
                  <span className="nav-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>

                  {!collapsed && (
                    <span className="nav-text">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button
            className="nav-item logout-btn"
            onClick={logout}
            title={collapsed ? "Logout" : ""}>
            <span className="nav-icon">
              <LogOut size={18} strokeWidth={1.8} />
            </span>

            {!collapsed && (
              <span className="nav-text">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      <main className="main-area">
          
        <header className="topbar">

          <div className="topbar-left">

            <button
              className="menu-toggle"
              onClick={() => setCollapsed(!collapsed)}
              title="Toggle sidebar">
              <Menu size={20} strokeWidth={1.8} />
            </button>

            <div className="search-box">
              <Search size={17} strokeWidth={1.8} />

              <input
                type="text"
                placeholder="Search anything..."
              />
            </div>
          </div>
  
          <div className="topbar-right">

            <button
              className="icon-button"
              title="Gen AI"
              onClick={()=> naviagte("/gen-ai")}>
              <Sparkles size={18} strokeWidth={1.8} />
            </button>

            <button
              className="icon-button notification"
              title="Notifications"
              onClick={() => {
            setNotificationsOpen(!notificationsOpen);
            setAiOpen(false);
          }}>
              <Bell size={18} strokeWidth={1.8} />
              <span></span>
            </button>
              {notificationsOpen && (
    <div className="notification-panel">

      <div className="notification-header">
        <strong>Notifications</strong>
      </div>

      <div className="notification-item">
        <Bell size={16} />
        <div>
          <strong>New quiz attempt</strong>
          <small>A student has completed a quiz.</small>
        </div>
      </div>

      <div className="notification-item">
        <BarChart3 size={16} />
        <div>
          <strong>Quiz report ready</strong>
          <small>Your latest report is available.</small>
        </div>
      </div>

    </div>
  )}

            <div className="profile">

              <div className="avatar">
                KS
              </div>

              <div className="profile-info">
                <strong>Admin User</strong>
                <small>Administrator</small>
              </div>

              <ChevronDown
                size={16}
                strokeWidth={1.8}
                className="profile-arrow"
              />

            </div>

          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>

      </main>
    </div>
  );
}

export default MainLayout;