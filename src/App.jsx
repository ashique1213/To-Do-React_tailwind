import Navbar from './components/Navbar'
import { useEffect } from 'react';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo,setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [save, setSave] = useState(false)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)    
    }
  },[])
  
  useEffect(() => {
    if (save) {
      localStorage.setItem("todos", JSON.stringify(todos))
      setSave(false)
    }
  }, [save])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id!==id
    })
    setTodos(newTodos)
    setSave(true)
  }

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item => {
      return item.id!==id
    })
    setTodos(newTodos)
    setSave(true)
  }

  const handleAdd = () => {
    if (!todo.trim()) {
      alert("Please enter a vlid todo!")
      return
    }
    setTodos([...todos, {id:uuidv4(),todo, isCompleted: false }])
    setTodo("")
    setSave(true)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    setSave(true)
  }
  

  return (
    <> 
    <Navbar/>
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-[35%]'>
        <h1 className='font-bold text-center text-3xl'>TODO APP</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className='flex '>
            <input onChange={handleChange} value={todo} type="text" placeholder="Enter your todo here" className='w-full rounded-lg px-3 py-2' />
            <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-2 text-sm font-bold  text-white rounded-lg mx-2'>Save</button>
          </div>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length===0 && <div className='m-5'>No To-Do list</div>}
          {todos.map(item => { 
            return <div key={item.id} className="todos flex  my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={`truncate ${item.isCompleted ? "line-through" : ""} w-[300px]`}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={ (e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={ (e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App
