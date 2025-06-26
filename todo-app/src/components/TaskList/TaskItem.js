import React from 'react';
import { useTodos } from '../../context/TodoContext';
import './TaskItem.css';

function TaskItem({ todo }) {
  const { toggleTodo, showModal } = useTodos();

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleTodo(todo.id);
  };

  const handleClick = () => {
    showModal(todo);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    showModal(todo);
  };

  const getStatusIcon = () => {
    switch (todo.status) {
      case 'completed':
        return (
          <div className="status-icon completed">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        );
      case 'archived':
        return (
          <div className="status-icon archived">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="21,8 21,21 3,21 3,8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
          </div>
        );
      default:
        return (
          <div className={`status-icon todo ${todo.category}`}>
            <span className="category-initial">
              {todo.category === 'personal' ? 'P' : 'B'}
            </span>
          </div>
        );
    }
  };

  return (
    <div 
      className={`task-item ${todo.status}`} 
      onClick={handleClick}
    >
      <div className="task-content">
        <button 
          className="status-btn" 
          onClick={handleToggle}
          disabled={todo.status === 'archived'}
        >
          {getStatusIcon()}
        </button>
        
        <div className="task-info">
          <h3 className="task-title">{todo.title}</h3>
          <div className="task-meta">
            <span className={`category-badge ${todo.category}`}>
              {todo.category}
            </span>
            {todo.completedAt && (
              <span className="completion-date">
                Completed {new Date(todo.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <button className="menu-btn" onClick={handleMenuClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </button>
    </div>
  );
}

export default TaskItem;
