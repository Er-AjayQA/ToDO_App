import { Outlet } from "react-router-dom";
import { Header } from "../Components/AdminPanel/Header";
import { Footer } from "../Components/AdminPanel/Footer";
import { ToastContainer } from "react-toastify";
import { SideMenu } from "../Components/AdminPanel/SideMenu";

export const AdminLayout = () => {
  return (
    <>
      <div className="relative">
        <ToastContainer autoClose={1000} />
        <div className="absolute top-0 start-0 h-screen w-[70px] bg-blue-primary">
          <SideMenu />
        </div>

        <div className="absolute top-0 start-[70px] end-0 w-100">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};
