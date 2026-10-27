
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateInvitation from "./pages/CreateInvitation";
import PublicInvitation from "./pages/PublicInvitation";
import MyInvitations from "./pages/MyInvitations";




function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-invitation" element={<CreateInvitation/>}/>
        <Route path="/invitation/:token" element={<PublicInvitation/>}/>
        <Route path="/my-invitations" element={<MyInvitations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

