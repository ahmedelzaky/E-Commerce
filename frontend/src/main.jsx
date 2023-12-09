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
import DarkContextProvider from "./context/darkModeContext";

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkContextProvider>
        <App />
      </DarkContextProvider>
    </Provider>
  </React.StrictMode>
);
