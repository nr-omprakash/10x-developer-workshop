import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskModal from './components/TaskModal/TaskModal';
import FilterOverlay from './components/FilterOverlay/FilterOverlay';
import Sidebar from './components/Navigation/Sidebar';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <TaskList />
        </main>
        <TaskModal />
        <FilterOverlay />
        <Sidebar />
      </div>
    </TodoProvider>
  );
}

export default App;
