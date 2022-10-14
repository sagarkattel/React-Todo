import {useState,useEffect} from "react";
import React from "react";

const useLocalStorage =(storageKey,fallbackState)=>{
  const[value,setValue]=useState(
      JSON.parse(localStorage.getItem(storageKey))??fallbackState
  )
  useEffect(()=>{
      localStorage.setItem(storageKey,JSON.stringify(value));
  },
  [value,setValue])

  return [value,setValue];
}



function Todo({todoValue,index,markTodo,removeTodo}){
  const[isMarked,setIsMarked]=useLocalStorage(index,false);

 const handleToggle=()=>{
  
  markTodo(index);
  setIsMarked(!isMarked);
  
 }
  return(
    <div>
      <span style={{textDecoration:todoValue.isDone&&isMarked?"line-through":""}}>{todoValue.text}</span>
      <div>
        <button onClick={handleToggle}>✓</button>{' '}
        <button onClick={()=>removeTodo(index)}>✕</button>
      </div>
    </div>
  );
};

function FormTodo({addTodo}){
  const[value,setValue]=useState("");

  const handleSubmit=e=>{
    e.preventDefault();
    if(!value)return;
    addTodo(value);
    setValue("");
  };
  return(
    <form onSubmit={handleSubmit}>
      <span>Add Todo</span>
      <input type="text" 
      name="value" 
      value={value}
      onChange={e=>setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}





function TodoApp(){
  const[todoValue,setTodoValue]=useLocalStorage([{text:"This is Sample",isDone:false}],false);

  const addTodo=text=>{
    const newTodo=[...todoValue,{text}];
    setTodoValue(newTodo);
  };

  const markTodo=index=>{
    const newTodo=[...todoValue];
    newTodo[index].isDone=true;
    setTodoValue(newTodo);
  };
  const removeTodo=index=>{
    const newTodo=[...todoValue];
    newTodo.splice(index,1);
    setTodoValue(newTodo);
  };
  return(
    <div>
      <div>
      <h1>To DO List</h1>
      <FormTodo addTodo={addTodo} />
      </div>
      <div>
        {todoValue.map((todoValue,index)=>(
          <Todo 
          index={index}
          key={index}
          todoValue={todoValue}
          markTodo={markTodo}
          removeTodo={removeTodo} 
          />
        ))}
      </div>


    </div>
  );
}
export default TodoApp;