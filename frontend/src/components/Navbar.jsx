import React from 'react';
import "./Navbar.css";

function Navbar(props) {
    return (
    <header className="navbar">
        <div className="navbar-search">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search anything..." />
        </div>

        <div className="user-profile">
          <div className="user-avatar">KS</div>
          <div className="user-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>
          <span className="dropdown-icon">⌄</span>
        </div>
      </div>
    </header>
    );
}

export default Navbar;