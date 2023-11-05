import "./App.css";
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import NavBar from "./component/NavBar/NavBar";
import NotFound from "./component/NotFound/NotFound";
import Products from "./component/Products/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
