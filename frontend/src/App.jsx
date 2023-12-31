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
import Orderslist from "./pages/admin/orderslist/Orderslist";
import Productslist from "./pages/admin/productslist/Productslist";
import Categorieslist from "./pages/admin/categorieslist/Categorieslist";
import Delivery from "./pages/admin/delivery/Delivery";
import AddProduct from "./pages/admin/add/AddProduct";
import AddCategory from "./pages/admin/add/AddCategory";
import EditProduct from "./pages/admin/edit/EditProduct";
import EditCategory from "./pages/admin/edit/EditCategory";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Notifications from "./pages/admin/notigications/Notigications";
import OrderDetails from "./pages/admin/orderdetails/OrderDetails";
import RequireAuth from "./component/RequireAuth";
import Customers from "./pages/admin/customers/Customers";
import { ROLES } from "./api/auth";
import Profile from "./pages/client/Profile/Profile";
import Payment from "./pages/client/Payment/Payment";
import Sails from "./pages/admin/sails/Sails";
import ProductsDetailsAdmin from "./pages/admin/productDetails/ProductDetailsAdmin";
import { useDispatch } from "react-redux";
import { refreshCart } from "./rtk/slices/cart-slice";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshCart());

    const handleKeyPress = (e) => {
      if (e.key === "~" && e.shiftKey) {
        navigate("/admin");
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [dispatch, navigate]);

  return (
    <div className={"app"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<All />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductsDetails />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<RequireAuth role={ROLES.user} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* admin */}
        <Route element={<RequireAuth role={ROLES.admin} />}>
          <Route path="/admin">
            <Route index element={<Dashboard />} />

            <Route path="customers">
              <Route index element={<Customers />} />
            </Route>

            <Route path="products">
              <Route index element={<Productslist />} />
              <Route path="new" element={<AddProduct />} />
              <Route path="edit/:productId" element={<EditProduct />} />
              <Route
                path="product/:productId"
                element={<ProductsDetailsAdmin />}
              />
            </Route>

            <Route path="orders">
              <Route index element={<Orderslist />} />
              <Route path=":orderId" element={<OrderDetails />} />
            </Route>

            <Route path="categories">
              <Route index element={<Categorieslist />} />
              <Route path="new" element={<AddCategory />} />
              <Route path="edit/:categoryId" element={<EditCategory />} />
            </Route>
            <Route path="delivery">
              <Route index element={<Delivery />} />
              <Route path=":orderId" element={<OrderDetails />} />
            </Route>
            <Route path="notifications">
              <Route index element={<Notifications />} />
              <Route path="edit/:productId" element={<EditProduct />} />
              <Route path=":orderId" element={<OrderDetails />} />
              <Route
                path="product/:productId"
                element={<ProductsDetailsAdmin />}
              />
            </Route>
            <Route path="sails" element={<Sails />} />
          </Route>
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
