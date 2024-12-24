import './App.css'
import TodoContextProvider from './context/TodoContextProvider'
import AddTodo from './components/AddTodo'
import ShowTodo from './components/ShowTodo'
import { DndContext } from '@dnd-kit/core'

function App() {

  return (
    <TodoContextProvider>
      <div className='flex flex-col p-2 h-[650px] sm:h-[500px] md:h-[650px] justify-start lg:w-[800px] md:w-[650px] sm:w-[445px] gap-2 rounded'>
      <h1 className='w-full headline rounded text-white sm:text-[xl] p-2 bg-[#388E3C] bg-opacity-45'>The Forever List</h1>
      <AddTodo/>
      <DndContext>
        <ShowTodo />
      </DndContext>
      </div>
    </TodoContextProvider>
  )
}

export default App
