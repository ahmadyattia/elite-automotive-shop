import { Routes, Route, Navigate } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/appointments" element={<Appointments />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
