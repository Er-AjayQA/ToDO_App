import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebLayout } from "./Layout/WebLayout.jsx";
import { Home } from "./Pages/WebPages/Home.jsx";
import { HomePage } from "./Pages/AdminPages/Home.jsx";
import { AdminLayout } from "./Layout/AdminLayout.jsx";
import { RegisterPage } from "./Pages/AdminPages/RegisterPage.jsx";
import { AuthProvider } from "./ContextAPI/AuthContext.jsx";
import ProtectedRoute from "./Routes/ProtectedRoutes.jsx";
import { MenuProvider } from "./ContextAPI/MenuContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <MenuProvider>
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
            <Route path="login" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<HomePage />} />{" "}
              </Route>
            </Route>
          </Route>
        </Routes>
      </MenuProvider>
    </AuthProvider>
  </BrowserRouter>
);
