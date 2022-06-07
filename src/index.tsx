import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";

const pageNotFound = (
  <div className="container">
    <main style={{ padding: "1rem" }}>
      <h2>404 Not Found</h2>
    </main>
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Encrypt />} />
          <Route path="encrypt" element={<Encrypt />} />
          <Route path="decrypt" element={<Decrypt />} />
          <Route path="*" element={pageNotFound} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
