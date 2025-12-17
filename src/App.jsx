import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='min-w-screen min-h-screen text-gray-50 '>
     

      <Navbar />

       <MainRoutes/>
    </div>
  )
}

export default App