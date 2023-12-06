import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Frontpage from "./Frontpage.jsx";

function App() {
  return (
    <div>
      <div className="sidebar" style={{ width: "25%" }}>
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
      <div style={{ marginLeft: "25%", width: "75%" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/about" element={"bloop"} />
            <Route path="/statistics" element={"oops"} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
