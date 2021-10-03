import React, { useState, useEffect } from 'react';
import './App.css';

// importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  // My States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // My USE EFFECT
  // Runs once when the App starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Runs when ever something changes in the App
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // My Functions and Events
  const filterHandler = () => {
    switch(status){
      default:
        setFilteredTodos(todos);
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
    }
  };

  // Save the TO DO LISTS to the Disk
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Getting my LocalTodos
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>ELLIN's Todo List</h1>
      </header>
      <Form 
        inputText = {inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={ setInputText }
        setStatus={setStatus}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos} 
      />
    </div>
  );
}

export default App;
