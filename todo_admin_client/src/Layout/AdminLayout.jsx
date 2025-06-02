import { Outlet } from "react-router-dom";
import { Header } from "../Components/AdminPanel/Header";
import { Footer } from "../Components/AdminPanel/Footer";
import { ToastContainer } from "react-toastify";

export const AdminLayout = () => {
  return (
    <>
      <div>
        <ToastContainer autoClose={1000} />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
