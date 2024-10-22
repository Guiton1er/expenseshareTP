import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='p-5 bg-teal-800 text-white'>
        <button>
          <a className='border border-teal-950 border-opacity-100 rounded-lg bg-teal-950 p-2 hover:bg-teal-900' href="http://localhost:5173/"> Home </a>
        </button>
      </div>
      <Outlet />
    </>
  )
}

export default App