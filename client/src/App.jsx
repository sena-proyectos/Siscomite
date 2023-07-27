import  { Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'

import './App.css'
import { Toast } from './Components/toast/toast'

function App  ()  {

  return (
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/Register' element = {<Register/>}/>
      <Route path='/toast' element = {<Toast/>}/>
    </Routes>

    
    
  )
}

export default App;
