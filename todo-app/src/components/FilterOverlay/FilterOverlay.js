import React from 'react';
import { useTodos } from '../../context/TodoContext';
import './FilterOverlay.css';

function FilterOverlay() {
  const { showFilters, toggleFilters, filter, setFilter, getStats, todos } = useTodos();

  if (!showFilters) return null;

  const stats = getStats();
  const completedCount = todos.filter(todo => todo.status === 'completed').length;
  const archivedCount = todos.filter(todo => todo.status === 'archived').length;
  const totalTasks = todos.length;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    toggleFilters();
  };

  return (
    <div className="filter-overlay" onClick={toggleFilters}>
      <div className="filter-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={toggleFilters}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="filter-section">
          <h4>Show Tasks</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === 'all'}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">All Tasks</span>
              <span className="filter-count">{stats.personal + stats.business}</span>
            </label>

            <label className="filter-option">
              <input
                type="radio"
                name="filter"
                value="todos"
                checked={filter === 'todos'}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">TODOs</span>
              <span className="filter-count">{todos.filter(todo => todo.status === 'todo').length}</span>
            </label>

            <label className="filter-option">
              <input
                type="radio"
                name="filter"
                value="completed"
                checked={filter === 'completed'}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">Completed</span>
              <span className="filter-count">{completedCount}</span>
            </label>

            <label className="filter-option">
              <input
                type="radio"
                name="filter"
                value="archived"
                checked={filter === 'archived'}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
              <span className="checkmark"></span>
              <span className="filter-label">Archived</span>
              <span className="filter-count">{archivedCount}</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h4>Advanced Filters</h4>
          <div className="advanced-filters">
            <div className="category-filters">
              <h5>Categories</h5>
              <div className="category-stats">
                <div className="category-stat personal">
                  <span className="category-name">Personal</span>
                  <span className="category-count">{stats.personal}</span>
                </div>
                <div className="category-stat business">
                  <span className="category-name">Business</span>
                  <span className="category-count">{stats.business}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h4>Completion Stats</h4>
          <div className="completion-stats">
            <div className="stat-row">
              <span className="stat-label">Total Tasks:</span>
              <span className="stat-value">{totalTasks}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Completed:</span>
              <span className="stat-value">{completedCount}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Completion Rate:</span>
              <span className="stat-value">{completionRate}%</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Archived:</span>
              <span className="stat-value">{archivedCount}</span>
            </div>
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterOverlay;
