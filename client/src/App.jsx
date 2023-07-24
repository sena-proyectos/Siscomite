import  { Route, Routes } from 'react-router-dom'
import { User } from './Components/User/User'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element = {<User/>}/>
    </Routes>

    
    
  )
}

export default App
