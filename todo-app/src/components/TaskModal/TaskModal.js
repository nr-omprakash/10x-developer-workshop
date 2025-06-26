import React, { useState, useEffect } from 'react';
import { useTodos } from '../../context/TodoContext';
import './TaskModal.css';

function TaskModal() {
  const { 
    showModal, 
    selectedTodo, 
    hideModal, 
    updateTodo, 
    deleteTodo, 
    toggleTodo, 
    archiveTodo 
  } = useTodos();
  
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('personal');

  useEffect(() => {
    if (selectedTodo) {
      setEditTitle(selectedTodo.title);
      setEditCategory(selectedTodo.category);
    }
  }, [selectedTodo]);

  if (!showModal || !selectedTodo) return null;

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(selectedTodo.id, {
        title: editTitle.trim(),
        category: editCategory
      });
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(selectedTodo.title);
    setEditCategory(selectedTodo.category);
    setEditMode(false);
  };

  const handleComplete = () => {
    toggleTodo(selectedTodo.id);
    hideModal();
  };

  const handleArchive = () => {
    archiveTodo(selectedTodo.id);
    hideModal();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(selectedTodo.id);
      hideModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={hideModal}>
      <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="task-status-indicator">
            <div className={`status-dot ${selectedTodo.status} ${selectedTodo.category}`}></div>
            <span className="status-text">
              {selectedTodo.status === 'completed' ? 'Completed' : 
               selectedTodo.status === 'archived' ? 'Archived' : 'Todo'}
            </span>
          </div>
          <button className="close-btn" onClick={hideModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {editMode ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-title-input"
                placeholder="Task title..."
                autoFocus
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="edit-category-select"
              >
                <option value="personal">Personal</option>
                <option value="business">Business</option>
              </select>
            </div>
          ) : (
            <div className="task-details">
              <h2 className="task-title">{selectedTodo.title}</h2>
              <div className="task-meta">
                <span className={`category-badge ${selectedTodo.category}`}>
                  {selectedTodo.category}
                </span>
              </div>
            </div>
          )}

          <div className="task-timestamps">
            <div className="timestamp">
              <span className="timestamp-label">Created:</span>
              <span className="timestamp-value">
                {formatDate(selectedTodo.createdAt)}
              </span>
            </div>
            {selectedTodo.completedAt && (
              <div className="timestamp">
                <span className="timestamp-label">Completed:</span>
                <span className="timestamp-value">
                  {formatDate(selectedTodo.completedAt)}
                </span>
              </div>
            )}
            {selectedTodo.archivedAt && (
              <div className="timestamp">
                <span className="timestamp-label">Archived:</span>
                <span className="timestamp-value">
                  {formatDate(selectedTodo.archivedAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {editMode ? (
            <div className="edit-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="task-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setEditMode(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </button>
              
              {selectedTodo.status !== 'archived' && (
                <button 
                  className={`btn ${selectedTodo.status === 'completed' ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleComplete}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                  {selectedTodo.status === 'completed' ? 'Mark as Todo' : 'Complete'}
                </button>
              )}
              
              {selectedTodo.status !== 'archived' && (
                <button className="btn btn-secondary" onClick={handleArchive}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="21,8 21,21 3,21 3,8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                  </svg>
                  Archive
                </button>
              )}
              
              <button className="btn btn-danger" onClick={handleDelete}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
