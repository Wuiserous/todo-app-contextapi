import { useContext, useState, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ShowTodo() {
    const [updateTodo, setUpdateTodo] = useState('')
    const [isEditing, setIsEditing] = useState(null)

    const { todos, setTodos } = useContext(TodoContext)

    const sortedTodosDesc = [...todos].reverse();

    const handleCheckTodo = (id) => {
        setTodos((prevTodos) => {
            // Step 1: Toggle the 'completed' status of the todo
            const updatedTodos = prevTodos.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            );
    
            // Step 2: Find the updated todo and move it to the last position
            const updatedTodo = updatedTodos.find(item => item.id === id);
            const todosWithoutUpdated = updatedTodos.filter(item => item.id !== id);
    
            // Step 3: Add the updated todo at the end of the array
            return [...todosWithoutUpdated, updatedTodo];
        });
    };
    

    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => 
            prevTodos.filter((item) => 
                item.id !== id
            )
        )
    }

    const enableEditing = (id, text) => {
        setUpdateTodo(text)
        setIsEditing(id)
    }

    const handleUpdateTodo = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id ?
                { ...todo, text: updateTodo}: todo
            )
        )

        setUpdateTodo('')
        setIsEditing('')
    }

    if (todos.length == 0) {
        return (
            <div className={`w-full border-[2px] hover:opacity-50 flex items-center justify-center h-[50px] opacity-25 border-dashed p-4 shadow-xl hover:bg-opacity-35 rounded transform transition delay-50 ease-in`}>
                    <span>no task added yet</span>
            </div>
        )
    }
    

    return (
        <div className="flex flex-col hide-scrollbar h-full overflow-auto gap-2"
        >
            {todos.map((todo, index) => (
                <div key={index} id={todo.id} className={`w-full p-4 shadow-xl hover:bg-opacity-35 rounded transform transition delay-50 ease-in ${todo.completed? 'bg-[#4CAF50] bg-opacity-25': 'bg-[#242424]'} flex items-center justify-between`}>
                    <div className="flex h-5 items-center justify-center gap-2">
                    <input type="checkbox" checked={todo.completed} onChange={() => handleCheckTodo(todo.id)} />
                    {isEditing === todo.id ? (<input type="text" className="border border-l-transparent border-t-transparent outline-none focus:outline-none  -ml-[0.9px] border-white/25 w-[480px] pl-0  text-xl bg-transparent" value={updateTodo} onChange={(e) => setUpdateTodo(e.target.value)}/>):(
                        <span className={`text-xl ${todo.completed? 'line-through text-[#A5D6A7]': ''}`}>{todo.text}</span>
                    )}
                    </div>
                    {!todo.completed ? (
                        <div className="flex h-full items-center justify-center gap-2">
                            {isEditing === todo.id ? (
                                <button className="rounded-full p-1 transform transition delay-100 ease-in hover:bg-[#4CAF50]" onClick={() => handleUpdateTodo(todo.id, todo.text)}><FaCheck size={15.45}/></button>
                            ):(
                                <button className="rounded-full p-1 transform transition delay-100 ease-in hover:bg-[#1E88E5]" onClick={() => enableEditing(todo.id, todo.text)}><MdEdit /></button>
                            )}
                            <button className="rounded-full p-1 transform transition delay-50 ease-in hover:bg-[#D32F2F]" onClick={() => handleDeleteTodo(todo.id)}><MdDelete /></button>
                        </div>
                    ): (
                        <div className="flex items-center justify-center full">
                            <button className="rounded-full p-1 transform transition delay-50 ease-in hover:bg-[#D32F2F] text-white" onClick={() => handleDeleteTodo(todo.id)}><MdDelete /></button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

