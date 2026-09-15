import React from "react";
import "./Navbar.css";

import {
  Search,
  Sparkles,
  CloudUpload,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">

      {/* SEARCH */}
      <div className="navbar-search">
        <Search
          size={17}
          strokeWidth={1.8}
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      {/* AI */}
      <button
        className="top-action-btn"
        title="AI Assistant"
      >
        <Sparkles
          size={17}
          strokeWidth={1.8}
        />
      </button>

      {/* UPLOAD */}
      <button
        className="top-action-btn"
        title="Upload"
      >
        <CloudUpload
          size={17}
          strokeWidth={1.8}
        />
      </button>

      {/* PROFILE */}
      <div className="user-profile">

        <div className="user-avatar">
          KS
        </div>

        <div className="user-info">
          <strong>Admin User</strong>
          <span>Administrator</span>
        </div>

        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className="dropdown-icon"
        />

      </div>

    </header>
  );
}

export default Navbar;