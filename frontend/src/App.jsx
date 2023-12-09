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
import Dashboard from "./pages/admin/home/Dashboard";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import List from "./pages/admin/list/List";
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { darkContext } from "./context/darkModeContext";
import Orderslist from "./pages/admin/orderslist/Orderslist";
import Productslist from "./pages/admin/productslist/Productslist";

function App() {
  const { dark } = useContext(darkContext);

  return (
    <Router>
      <div className={dark ? "app dark" : "app"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<All />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* admin */}
          <Route path="/admin">
            <Route index element={<Dashboard />} />

            <Route path="addproduct" element={<AddProduct />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<Productslist />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>

            <Route path="orders">
              <Route index element={<Orderslist />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>

          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
