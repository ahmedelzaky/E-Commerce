import "./App.css";
import Home from "./component/Home";
import NotFound from "./component/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
