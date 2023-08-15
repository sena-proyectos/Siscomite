import { Route, Routes } from "react-router-dom";
import { Register } from "./Components/Register/Register";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Students } from "./Components/Students/Students";
import { Requests } from "./Components/Requests/Requests";
import { Create } from "./Components/Create/Create";
import { Groups } from "./Components/Groups/Groups";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/create" element={<Create />} />
      <Route path="/groups" element={<Groups />} />
    </Routes>
  );
}

export default App;
