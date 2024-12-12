import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/Index'




function App() {


  return (
    <>
     
      <Routes>
        <Route path='/auth' element={<AuthPage/>}></Route>

      </Routes>

    </>
  )
}

export default App
