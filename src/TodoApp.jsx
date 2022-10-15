import React, { useState,useEffect } from "react";
import "./TodoApp.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const useLocalStorage =(storageKey,fallbackState)=>{
  const[value,setValue]=useState(
      JSON.parse(localStorage.getItem(storageKey))??fallbackState
  )
  useEffect(()=>{
      localStorage.setItem(storageKey,JSON.stringify(value));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value,setValue])
  return [value,setValue];
}

function Todo({ todo, index, markTodo, removeTodo }) {

  const[isMarked,setIsMarked]=useLocalStorage(`${index}`,false);
  const handleToggle=()=>{
  
    markTodo(index);
    setIsMarked(!isMarked);
   }
   useEffect(() => {
    localStorage.setItem(`${index}`, JSON.stringify(isMarked));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarked]);


  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone&&isMarked ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={handleToggle}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function TodoApp() {
  const[todos,setTodos]=useLocalStorage([{text:"This is Sample",isDone:false}],false);


  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;