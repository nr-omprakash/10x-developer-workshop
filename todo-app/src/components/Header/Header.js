import React from 'react';
import { useTodos } from '../../context/TodoContext';
import './Header.css';

function Header() {
  const { getStats, toggleSidebar, toggleFilters } = useTodos();
  const stats = getStats();
  
  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return now.toLocaleDateString('en-GB', options);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <div className="header-title">
            <h1>Your Things</h1>
            <p className="date">{getCurrentDate()}</p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="stats">
            <div className="stat-item personal">
              <span className="stat-number">{stats.personal}</span>
              <span className="stat-label">Personal</span>
            </div>
            <div className="stat-item business">
              <span className="stat-number">{stats.business}</span>
              <span className="stat-label">Business</span>
            </div>
          </div>
          
          <button className="filter-btn" onClick={toggleFilters}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
