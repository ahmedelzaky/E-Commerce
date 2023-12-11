import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import All from "./pages/client/All/All";
import Cart from "./pages/client/Cart/Cart";
import ProductsDetails from "./pages/client/ProductDetails/ProductDetails";
import Category from "./pages/client/Category/Category";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";
import Dashboard from "./pages/admin/home/Dashboard";
import Single from "./pages/admin/single/Single";
import List from "./pages/admin/list/List";
import { useContext } from "react";
import { darkContext } from "./context/darkModeContext";
import Orderslist from "./pages/admin/orderslist/Orderslist";
import Productslist from "./pages/admin/productslist/Productslist";
import Categorieslist from "./pages/admin/categorieslist/Categorieslist";
import Delivery from "./pages/admin/delivery/Delivery";
import AddProduct from "./pages/admin/add/AddProduct";
import AddCategory from "./pages/admin/add/AddCategory";
import EditProduct from "./pages/admin/edit/EditProduct";

function App() {
  const { dark } = useContext(darkContext);
  const navigate = useNavigate();

  window.addEventListener("keypress", (e) => {
    if (e.key === "~" && e.shiftKey) {
      navigate("/admin");
    }
  });

  return (
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

          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
          </Route>

          <Route path="products">
            <Route index element={<Productslist />} />
            <Route path="new" element={<AddProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />
            <Route path=":productId" element={<Single />} />
          </Route>

          <Route path="orders">
            <Route index element={<Orderslist />} />
            <Route path=":orderId" element={<Single />} />
          </Route>

          <Route path="categories">
            <Route index element={<Categorieslist />} />
            <Route path="new" element={<AddCategory />} />
            <Route path=":categoryId" element={<Single />} />
          </Route>
          <Route path="delivery" element={<Delivery />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
