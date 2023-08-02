import { Route, Routes } from 'react-router-dom'
import { User } from './Components/User/User'
import { Register } from './Components/User/Register'
import { Home } from './Components/Home/Home'
import { Students } from './Components/Students/Students'
import { Requests } from './Components/Requests/Requests'

import './App.css'

function App  ()  {

  return (
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/Register' element = {<Register/>}/>
      <Route path='/Home' element = {<Home/>}/>
      <Route path='/Students' element = {<Students/>}/>
      <Route path='/Requests' element = {<Requests/>}/>
    </Routes>

    
    
  )
}

export default App;
