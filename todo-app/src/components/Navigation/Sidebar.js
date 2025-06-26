import React from 'react';
import { useTodos } from '../../context/TodoContext';
import './Sidebar.css';

function Sidebar() {
  const { showSidebar, toggleSidebar, filter, setFilter } = useTodos();

  if (!showSidebar) return null;

  const handleFilterSelect = (newFilter) => {
    setFilter(newFilter);
    toggleSidebar();
  };

  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: '📋' },
    { id: 'todos', label: 'TODOs', icon: '📝' },
    { id: 'completed', label: 'Completed', icon: '✅' },
    { id: 'archived', label: 'Archived', icon: '📦' }
  ];

  return (
    <>
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button className="close-btn" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map(item => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${filter === item.id ? 'active' : ''}`}
                  onClick={() => handleFilterSelect(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="app-info">
            <h4>Your Things</h4>
            <p>Todo App v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
