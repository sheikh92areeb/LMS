import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='bg-blue-200 bg-[url("./assets/future-grid.jpg")] bg-cover bg-no-repeat bg-center min-h-screen w-full'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
