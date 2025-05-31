import { Outlet } from "react-router-dom";
import { Header } from "../Components/WebSite/Header";
import { Footer } from "../Components/WebSite/Footer";
import { ToastContainer } from "react-toastify";

export const WebLayout = () => {
  return (
    <>
      <div className="h-screen">
        <ToastContainer autoClose={1000} />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
