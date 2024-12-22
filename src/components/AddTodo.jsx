import { useContext, useState, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import {nanoid} from 'nanoid'

export default function AddTodo() {
    const [newTodo, setNewTodo] = useState('')

    const {setTodos} = useContext(TodoContext)

    const handleAddTodo = (e) => {
        e.preventDefault()

        if (newTodo) {
            setTodos((prevTodo) => [
                ...prevTodo,
                {
                  id: nanoid(),
                  text: newTodo, // Replace with your actual todo text
                  completed: false, // Set initial completed status
                },
              ]);
    
              setNewTodo('')
        }

    }

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Enter' && newTodo.trim() !== '') {
            handleAddTodo(e); // Trigger adding the todo if Enter is pressed
          }
        };
    
        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [newTodo]);


    return (
        <div className="flex relative w-full items-center justify-center">
            <input className="p-2 outline-none hover:bg-opacity-75 transform transition delay-50 ease-in text-[#757575] focus:outline-none rounded rounded-tr-[0px] w-full rounded-br-[0px] bg-[#2C2C2C]" type="text" value={newTodo} placeholder="Add To-Do here..." onChange={(e) => setNewTodo(e.target.value)}/>
            <button className="rounded rounded-tl-[0px] transform transition delay-50 ease-in hover:bg-[#388E3C] rounded-bl-[0px] bg-[#4CAF50] p-2" onClick={handleAddTodo}>+</button>
        </div>
    )
}