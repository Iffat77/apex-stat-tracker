import "./App.css";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App h-screen w-screen">
      <div className="app-container"></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
