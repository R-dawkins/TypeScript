import React,{useRef} from 'react';
import './NewTodo.css'
type NewTodoProps={
  onAddTodo:(todoText:string)=>void
}

const NewTodo:React.FC<NewTodoProps> = (props)=>{
  const textInputRef = useRef<HTMLInputElement>(null);
  const todosSubmitHandler=(e:React.FormEvent)=>{
    e.preventDefault(); 
    const enteredText = textInputRef.current!.value
    props.onAddTodo(enteredText);
  }
  return(
    <form onSubmit={todosSubmitHandler}>
      <div className='form-control'> 
        <label htmlFor="todo-text">Todo List</label>
        <input type="text" id='todo-text' ref={textInputRef }/>
      </div>
      <button type='submit'>ADD TODO</button>
    </form>
  );
}

export default NewTodo