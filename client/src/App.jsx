import  { Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'

import './App.css'

function App  ()  {

  return (
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/Register' element = {<Register/>}/>
    </Routes>

    
    
  )
}

export default App;
