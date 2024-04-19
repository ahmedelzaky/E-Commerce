import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ROLES } from "./api/auth";
import { useDispatch } from "react-redux";
import { refreshCart } from "./rtk/slices/cart-slice";
import { useEffect, lazy, Suspense } from "react";

import LoadingScreen from "./component/LoadingScreen";
const Home = lazy(() => import("./pages/client/Home/Home"));
const All = lazy(() => import("./pages/client/All/All"));
const Cart = lazy(() => import("./pages/client/Cart/Cart"));
const ProductsDetails = lazy(() =>
  import("./pages/client/ProductDetails/ProductDetails")
);
const Category = lazy(() => import("./pages/client/Category/Category"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const SignIn = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const Orderslist = lazy(() => import("./pages/admin/orderslist/Orderslist"));
const Productslist = lazy(() =>
  import("./pages/admin/productslist/Productslist")
);
const Categorieslist = lazy(() =>
  import("./pages/admin/categorieslist/Categorieslist")
);
const Delivery = lazy(() => import("./pages/admin/delivery/Delivery"));
const AddProduct = lazy(() => import("./pages/admin/add/AddProduct"));
const AddCategory = lazy(() => import("./pages/admin/add/AddCategory"));
const EditProduct = lazy(() => import("./pages/admin/edit/EditProduct"));
const EditCategory = lazy(() => import("./pages/admin/edit/EditCategory"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Notifications = lazy(() =>
  import("./pages/admin/notigications/Notigications")
);
const OrderDetails = lazy(() =>
  import("./pages/admin/orderdetails/OrderDetails")
);
const RequireAuth = lazy(() => import("./component/RequireAuth"));
const Customers = lazy(() => import("./pages/admin/customers/Customers"));
const Profile = lazy(() => import("./pages/client/Profile/Profile"));
const Payment = lazy(() => import("./pages/client/Payment/Payment"));

const Sails = lazy(() => import("./pages/admin/sails/Sails"));
const ProductsDetailsAdmin = lazy(() =>
  import("./pages/admin/productDetails/ProductDetailsAdmin")
);

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
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </div>
  );
}

export default App;
