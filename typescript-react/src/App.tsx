import React,{useState} from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';
// import {Route} from 'react-router-dom'
function App() {
  const [todos,setTodos] = useState<Todo[]>([])
  // useState를 사용할 때 첫 렌더링에 빈 배열이 들어가는 문제를 <>제네릭 타입을 이용하여 해결할 수 있다.
  const todoAddHandler = (text:string)=>{
    setTodos(prevTodos=>[...prevTodos,{id: Math.random().toString(),text:text}])
  }
  const todoDeleteHandler = (todoId:string):void=>{
    setTodos(prevTodos=>{
      return prevTodos.filter(todo=>todoId !== todo.id)
    });
  }
  return (
    <div className="App">
      <NewTodo
        onAddTodo={todoAddHandler}
      ></NewTodo>
      <TodoList
      onDeleteTodo={todoDeleteHandler}
      items={todos}
      ></TodoList>
    </div>
  );
}

export default App;
