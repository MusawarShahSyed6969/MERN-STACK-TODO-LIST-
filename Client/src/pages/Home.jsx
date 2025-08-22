import { TextField, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import EditIcon from "../../public/edit.png"
import DeleteIcon from "../../public/delete.png"
import EditIcon2 from "../../public/edit2.png"

import { HandleDelete, HandleonComplete } from "../components/Helpers"
import { toast } from 'react-toastify';

const BASE_URL = "https://mern-stack-todo-list-five.vercel.app/api"

const Home = () => {

  // Holds the text typed into the input (either new todo OR updated one)
  const [TodoSender, setTodoSender] = useState("")

  // Stores the full list of todos fetched from backend
  const [Todolist, setTodolist] = useState([]);

  // Stores the id of the todo that is currently being edited (empty means add mode)
  const [EditID, setEditID] = useState("");


  // Runs only once when component mounts (fetches initial todos from backend)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/gettodo`);
        console.log(res.data.TodoList);

        setTodolist(res.data.TodoList)

        // Show notification when data loaded
        toast.success("Todo List Loaded");

      } catch (err) {
        console.error(err);

        // Show error notification if server failed
        toast.error("Cant Retrive Data Server ERROR");
      }
    };

    fetchData();
  }, []);   // Empty dependency → run once on mount


  // Handles both ADD and EDIT depending on whether EditID is set
  const HandleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if input is empty
    if (!TodoSender)
      return toast.warn("Must Fill Fields");

    try {
      if (EditID) {   // EDIT MODE
        const res = await axios.put(`${BASE_URL}/updatetodo/${EditID}`, {
          Todo: TodoSender
        })

        // Update UI instantly without re-fetching all todos
        setTodolist(prev =>
          prev.map(todo => (todo._id === EditID ? { ...todo, Todo: TodoSender } : todo))
        );

        toast.success("Todo Edit Successfully");

      } else {   // ADD MODE

        const res = await axios.post(`${BASE_URL}/posttodo`, {
          Todo: TodoSender
        })

        console.log(res);

        const data = await res.data.newList;

        // Add new todo at the end of list
        setTodolist((prev) => [...prev, res.data.newList]);

        toast.success("Todo List Uploaded");
      }

      // Reset input and editing state
      setTodoSender("");
      setEditID("");

    } catch (error) {
      console.log(error.message);
      toast.error("Failed To Sumbit Data ")
    }
  }


  // Handles clicking the EDIT button
  const EditHandler = (id) => {
    // If the same todo is clicked again → exit edit mode
    if (EditID == id) {
      setEditID("");
      setTodoSender("");
    } else {
      // Enter edit mode for selected todo
      setEditID(id)
      console.log(Todolist.filter(edit => edit._id == id));
    }
  }


  return (
    <div className='home-Container'>

      {/* Page Logo / Header */}
      <div className="logo">
        <h1> Todo List</h1>
      </div>

      <div className='middle-Container'>
        {/* Input + Submit Button */}
        <form className='under_middle' onSubmit={HandleSubmit}>
          <input
            value={TodoSender}
            onChange={(e) => setTodoSender(e.target.value)}
            className='Todo_Input'
            type="text"
            placeholder='Enter Todo...'
          />
          <button type='submit'> {EditID ? 'EDIT' : 'ADD'} </button>
        </form>

        {/* Todo List Rendering */}
        <div className='list-Container'>
          {Todolist.map(todo => (
            <div className='list-items' key={todo._id}>

              {/* Todo text + Complete button */}
              <div className='under_listItems'>
                <button onClick={() => HandleonComplete(todo._id, todo.isCompleted, setTodolist)}></button>
                <p className={todo.isCompleted ? 'line-through' : 'todo_text'}>{todo.Todo}</p>
              </div>

              {/* Action Buttons → Edit + Delete */}
              <div className='action-btn'>

                {/* Edit Button: turns green when active (edit mode) */}
                <button
                  className={`edit_btn quick_btn ${EditID === todo._id ? "active-edit" : ""}`}
                  onClick={() => EditHandler(todo._id)}
                >
                  <img className='short_img' src={EditIcon2} alt="Edit" />
                </button>

                {/* Delete Button */}
                <button className='delete_btn quick_btn' onClick={() => HandleDelete(todo._id, setTodolist)}>
                  <img className='short_img' src={DeleteIcon} alt="Del" />
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
