import "./App.css";
import AddProduct from "./component/admin/AddProduct";
import Cart from "./component/client/Cart/Cart";
import Home from "./component/client/Home/Home";
import NavBar from "./component/client/NavBar/NavBar";
import NotFound from "./component/client/NotFound/NotFound";
import Products from "./component/client/Products/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <NavBar>
                <Home />
              </NavBar>
            }
          />
          <Route
            path="/all"
            element={
              <NavBar>
                <Products />
              </NavBar>
            }
          />
          <Route
            path="/cart"
            element={
              <NavBar>
                <Cart />
              </NavBar>
            }
          />

          {/* admin */}
          <Route path="/admin/addproduct" element={<AddProduct />} />

          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
