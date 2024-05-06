import React from "react";
import ReactDOM from "react-dom/client";

// import { RouterProvider } from "react-router-dom";
// import router from "./router";
import "./css/App.css";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="overlay"></div>
    <div className="content">
      <div className="p-4 h-screen flex items-center justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <AuthContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>
);
