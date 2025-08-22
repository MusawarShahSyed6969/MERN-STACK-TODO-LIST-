import {React, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const HandleDelete = async (id,setTodolist ) => {
    try {
      const res = await axios.delete(`http://192.168.100.155:5000/api/deletetodo/${id}`);
      console.log(res.data);

      setTodolist(prev => prev.filter(t => t._id !== id));

      toast.success("Todo Deleted Successfully")

      return res.data;
    } catch (error) {
      toast.error("Failed To Delete Todo")
      console.error(error.message);
    }
  };


  export const HandleonComplete = async (id,isComplete,setTodolist) => {

    try {
        
        const res = await axios.patch(`http://192.168.100.155:5000/api/completetodo/${id}`,{isCompleted:!isComplete})

        console.log(res);

     

        setTodolist(prev =>
          prev.map(todo =>
            todo._id === id
              ? { ...todo, isCompleted: !isComplete }
              : todo
          )
        );
        
        toast.success("Todo Updated Successfully")

        return res.data
        
    } catch (error) {
        console.log(error.message);
        toast.error("Todo Updating Failed")
        
    }

  }
  