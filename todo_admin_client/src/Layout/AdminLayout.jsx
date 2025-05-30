import { Outlet } from "react-router-dom";
import { Header } from "../Components/AdminPanel/Header";
import { Footer } from "../Components/AdminPanel/Footer";

export const AdminLayout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
