import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import All from "./pages/client/All/All";
import Cart from "./pages/client/Cart/Cart";
import ProductsDetails from "./pages/client/ProductDetails/ProductDetails";
import Category from "./pages/client/Category/Category";
import NotFound from "./pages/NotFound/NotFound";
import AddProduct from "./pages/admin/AddProduct";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<All />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

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
