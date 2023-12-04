import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import All from "./pages/client/All/All";
import Cart from "./pages/client/Cart/Cart";
import ProductsDetails from "./pages/client/ProductDetails/ProductDetails";
import Categorie from "./pages/client/Categories/Categorie";
import NotFound from "./pages/NotFound/NotFound";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<All />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/category/:categoryName" element={<Categorie />} />

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
