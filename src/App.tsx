import React from 'react';
import './App.css';
import AddToDo from './components/AddToDo';
import TodosList from './components/TodosList';
import Header from './components/Header';

function App() {
  return (
    <main>
      <h2>Todo List Application</h2>
      <Header/>
      <AddToDo/>
      <TodosList/>
    </main>
  );
}

export default App;
