import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList() {
  const { getFilteredTodos, addTodo, filter } = useTodos();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredTodos = getFilteredTodos();
  const todoTasks = filteredTodos.filter(todo => todo.status === 'todo');
  const completedTasks = filteredTodos.filter(todo => todo.status === 'completed');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTodo(newTaskTitle.trim(), newTaskCategory);
      setNewTaskTitle('');
      setShowAddForm(false);
    }
  };

  const getSectionTitle = () => {
    switch (filter) {
      case 'todos':
        return 'Todo Tasks';
      case 'completed':
        return 'Completed Tasks';
      case 'archived':
        return 'Archived Tasks';
      default:
        return 'All Tasks';
    }
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>{getSectionTitle()}</h2>
        {filter !== 'completed' && filter !== 'archived' && (
          <button 
            className="add-task-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Task
          </button>
        )}
      </div>

      {showAddForm && (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="task-input"
              autoFocus
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="category-select"
            >
              <option value="personal">Personal</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setShowAddForm(false);
                setNewTaskTitle('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="tasks-container">
        {filter === 'all' || filter === 'todos' ? (
          <>
            {todoTasks.length > 0 && (
              <div className="task-section">
                <h3 className="section-title">TODOs</h3>
                <div className="tasks">
                  {todoTasks.map(todo => (
                    <TaskItem key={todo.id} todo={todo} />
                  ))}
                </div>
              </div>
            )}

            {filter === 'all' && completedTasks.length > 0 && (
              <div className="task-section">
                <h3 className="section-title">Completed</h3>
                <div className="tasks">
                  {completedTasks.map(todo => (
                    <TaskItem key={todo.id} todo={todo} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="tasks">
            {filteredTodos.map(todo => (
              <TaskItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2"></path>
              <path d="M11 13.29V19a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5.71"></path>
              <path d="M14 6a2 2 0 0 0-2-2H9.5a2 2 0 0 0-2 2v4.5a2 2 0 0 0 2 2H12a2 2 0 0 0 2-2V6Z"></path>
            </svg>
            <h3>No tasks found</h3>
            <p>
              {filter === 'todos' && "You don't have any pending tasks."}
              {filter === 'completed' && "You haven't completed any tasks yet."}
              {filter === 'archived' && "You don't have any archived tasks."}
              {filter === 'all' && "Start by adding your first task!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
