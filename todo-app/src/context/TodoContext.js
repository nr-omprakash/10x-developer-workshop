import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'todos', 'completed', 'archived'
  showModal: false,
  selectedTodo: null,
  showFilters: false,
  showSidebar: false
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? {
                ...todo,
                status: todo.status === 'completed' ? 'todo' : 'completed',
                completedAt: todo.status === 'completed' ? null : new Date().toISOString()
              }
            : todo
        )
      };
    
    case 'ARCHIVE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? {
                ...todo,
                status: 'archived',
                archivedAt: new Date().toISOString()
              }
            : todo
        )
      };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SHOW_MODAL':
      return { ...state, showModal: true, selectedTodo: action.payload };
    
    case 'HIDE_MODAL':
      return { ...state, showModal: false, selectedTodo: null };
    
    case 'TOGGLE_FILTERS':
      return { ...state, showFilters: !state.showFilters };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, showSidebar: !state.showSidebar };
    
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    } else {
      // Add some sample data
      const sampleTodos = [
        {
          id: '1',
          title: 'Task 1',
          category: 'personal',
          status: 'todo',
          createdAt: new Date().toISOString(),
          completedAt: null,
          archivedAt: null
        },
        {
          id: '2',
          title: 'Task 2',
          category: 'personal',
          status: 'todo',
          createdAt: new Date().toISOString(),
          completedAt: null,
          archivedAt: null
        },
        {
          id: '3',
          title: 'Task 3',
          category: 'business',
          status: 'completed',
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          archivedAt: null
        }
      ];
      dispatch({ type: 'SET_TODOS', payload: sampleTodos });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (title, category = 'personal') => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      category,
      status: 'todo',
      createdAt: new Date().toISOString(),
      completedAt: null,
      archivedAt: null
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id, updates) => {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
      dispatch({ type: 'UPDATE_TODO', payload: { ...todo, ...updates } });
    }
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const archiveTodo = (id) => {
    dispatch({ type: 'ARCHIVE_TODO', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const showModal = (todo = null) => {
    dispatch({ type: 'SHOW_MODAL', payload: todo });
  };

  const hideModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const toggleFilters = () => {
    dispatch({ type: 'TOGGLE_FILTERS' });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const getFilteredTodos = () => {
    switch (state.filter) {
      case 'todos':
        return state.todos.filter(todo => todo.status === 'todo');
      case 'completed':
        return state.todos.filter(todo => todo.status === 'completed');
      case 'archived':
        return state.todos.filter(todo => todo.status === 'archived');
      default:
        return state.todos.filter(todo => todo.status !== 'archived');
    }
  };

  const getStats = () => {
    const personal = state.todos.filter(todo => todo.category === 'personal' && todo.status !== 'archived').length;
    const business = state.todos.filter(todo => todo.category === 'business' && todo.status !== 'archived').length;
    return { personal, business };
  };

  const value = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    archiveTodo,
    setFilter,
    showModal,
    hideModal,
    toggleFilters,
    toggleSidebar,
    getFilteredTodos,
    getStats
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
