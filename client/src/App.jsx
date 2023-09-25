import { Route, Routes } from 'react-router-dom'
import { Register } from './Components/Register/Register'
import { Login } from './Components/Login/Login'
import { Home } from './Components/Home/Home'
import { Students } from './Components/Students/Students'
import { Requests } from './Components/Requests/Requests'
import { Create } from './Components/Create/Create'
import { Groups } from './Components/Groups/Groups'
import { Rules } from './Components/Rules/Rules'
import { Setting } from './Components/Setting/Setting'
import { Teachers } from './Components/Teachers/Teachers'
import { Procedures } from './Components/Procedure/Procedures'
import { ForgotPassword } from './Components/ForgotPassword/ForgotPassword'
import { Test } from './Components/Test/Test'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/students/:id_ficha" element={<Students />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/create" element={<Create />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/procedures" element={<Procedures />} />
      <Route path="/password" element={<ForgotPassword />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
