import './App.css'
import TodoContextProvider from './context/TodoContextProvider'
import AddTodo from './components/AddTodo'
import ShowTodo from './components/ShowTodo'

function App() {

  return (
    <TodoContextProvider>
      <div className='flex flex-col justify-start w-[600px] h-fit gap-2 rounded'>
      <h1 className='w-full headline rounded text-white p-2 bg-[#388E3C] bg-opacity-45'>The Forever List</h1>
      <AddTodo/>
      <ShowTodo />
      </div>
    </TodoContextProvider>
  )
}

export default App
