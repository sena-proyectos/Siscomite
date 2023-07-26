import  { Route, Routes } from 'react-router-dom'
import { User } from './Components/User/User'
import { Register } from './Components/User/Register'

import './App.css'

function App  ()  {

  return (
    <Routes>
      <Route path='/' element = {<User/>}/>
      <Route path='/Register' element = {<Register/>}/>
    </Routes>

    
    
  )
}

export default App;
