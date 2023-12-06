import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Frontpage from "./Frontpage.jsx";
import Statistics from "./Statistics.jsx";

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
          <a href="/statistics" className="button">
            Statistics
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
            <Route path="/about" element={"bloop"} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
