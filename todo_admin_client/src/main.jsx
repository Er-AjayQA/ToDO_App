import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginLayout } from "./Layout/LoginLayout.jsx";
import { LoginPage } from "./Pages/Login.jsx";
import { RootLayout } from "./Layout/RootLayout.jsx";
import { Home } from "./Pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin">
        <Route element={<LoginLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
