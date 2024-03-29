import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Frontpage from "./Frontpage.jsx";
import About from "./About.jsx";
import Cat from "./Cat.jsx";

function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-item">
          <a href="/" className="button">
            Home
          </a>
        </div>
        <div className="sidebar-item">
          <a href="/cat" className="button">
            Cat.
          </a>
        </div>
        <div className=" sidebar-item">
          <a href="/about" className="button">
            About
          </a>
        </div>
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cat" element={<Cat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
