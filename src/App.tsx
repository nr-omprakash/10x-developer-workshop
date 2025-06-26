import React, { useState } from 'react';
import './App.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  archived: boolean;
  category: 'personal' | 'business';
  createdAt: Date;
}

interface FilterState {
  todos: boolean;
  completed: boolean;
  archived: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Task 1',
      completed: false,
      archived: false,
      category: 'personal',
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'Task 2',
      completed: false,
      archived: false,
      category: 'business',
      createdAt: new Date()
    },
    {
      id: '3',
      text: 'Task 3',
      completed: true,
      archived: false,
      category: 'personal',
      createdAt: new Date()
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    todos: true,
    completed: true,
    archived: false
  });

  const personalCount = tasks.filter(t => t.category === 'personal' && !t.archived).length;
  const businessCount = tasks.filter(t => t.category === 'business' && !t.archived).length;

  const filteredTasks = tasks.filter(task => {
    if (task.archived && !filters.archived) return false;
    if (task.completed && !filters.completed) return false;
    if (!task.completed && !task.archived && !filters.todos) return false;
    return true;
  });

  const todoTasks = filteredTasks.filter(t => !t.completed && !t.archived);
  const completedTasks = filteredTasks.filter(t => t.completed && !t.archived);

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        archived: false,
        category: 'personal',
        createdAt: new Date()
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const archiveTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, archived: true } : task
    ));
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app">
      {/* Main View */}
      <div className={`main-view ${selectedTask ? 'blur' : ''}`}>
        <header className="header">
          <button 
            className="menu-btn"
            onClick={handleMenuClick}
          >
            ☰
          </button>
          <div className="header-content">
            <h1>Your Things</h1>
            <div className="counters">
              <span className="counter personal">{personalCount} Personal</span>
              <span className="counter business">{businessCount} Business</span>
            </div>
          </div>
        </header>

        <div className="date">{getCurrentDate()}</div>

        <div className="add-task">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="add-task-input"
          />
          <button onClick={addTask} className="add-btn">+</button>
        </div>

        {todoTasks.length > 0 && (
          <section className="section">
            <h2>TODOs</h2>
            {todoTasks.map(task => (
              <div key={task.id} className="task-item" onClick={() => handleTaskClick(task)}>
                <div className="task-icon">
                  <span className={`icon ${task.category}`}>
                    {task.category === 'personal' ? '👤' : '💼'}
                  </span>
                </div>
                <span className="task-text">{task.text}</span>
                <button className="task-menu">⋮</button>
              </div>
            ))}
          </section>
        )}

        {completedTasks.length > 0 && (
          <section className="section">
            <h2>Completed</h2>
            {completedTasks.map(task => (
              <div key={task.id} className="task-item completed" onClick={() => handleTaskClick(task)}>
                <div className="task-icon">
                  <span className={`icon ${task.category}`}>✓</span>
                </div>
                <span className="task-text">{task.text}</span>
                <button className="task-menu">⋮</button>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Task Detail Overlay */}
      {selectedTask && (
        <div className="overlay" onClick={() => setSelectedTask(null)}>
          <div className="task-detail" onClick={(e) => e.stopPropagation()}>
            <div className="task-detail-header">
              <div className="task-icon">
                <span className={`icon ${selectedTask.category}`}>
                  {selectedTask.completed ? '✓' : (selectedTask.category === 'personal' ? '👤' : '💼')}
                </span>
              </div>
              <span className="task-text">{selectedTask.text}</span>
            </div>
            <div className="task-actions">
              {!selectedTask.completed && (
                <button 
                  className="action-btn complete"
                  onClick={() => {
                    toggleTask(selectedTask.id);
                    setSelectedTask(null);
                  }}
                >
                  Complete
                </button>
              )}
              <button 
                className="action-btn delete"
                onClick={() => deleteTask(selectedTask.id)}
              >
                Delete
              </button>
              <button 
                className="action-btn archive"
                onClick={() => archiveTask(selectedTask.id)}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Overlay */}
      {showMenu && (
        <div className="overlay" onClick={() => setShowMenu(false)}>
          <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {showFilters ? '▼' : '▶'}
            </button>
            
            {showFilters && (
              <div className="filters">
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.todos}
                    onChange={(e) => setFilters({...filters, todos: e.target.checked})}
                  />
                  TODOs
                </label>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.completed}
                    onChange={(e) => setFilters({...filters, completed: e.target.checked})}
                  />
                  Complete
                </label>
                <label className="filter-item">
                  <input
                    type="checkbox"
                    checked={filters.archived}
                    onChange={(e) => setFilters({...filters, archived: e.target.checked})}
                  />
                  Archived
                </label>
              </div>
            )}
            
            <div className="advanced-features">
              <h3>Advanced Features</h3>
              <p>Completion Goals</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
