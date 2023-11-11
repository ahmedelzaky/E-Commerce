import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./rtk/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  }) && (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
);
