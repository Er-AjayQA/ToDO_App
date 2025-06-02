import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebLayout } from "./Layout/WebLayout.jsx";
import { Home } from "./Pages/WebPages/Home.jsx";
import { AdminLayout } from "./Layout/AdminLayout.jsx";
import { RegisterPage } from "./Pages/AdminPages/RegisterPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Web Routes */}
      <Route path="/">
        <Route element={<WebLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/task-management/:companyId/">
        <Route path="register" element={<RegisterPage />} />
        <Route element={<AdminLayout />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
