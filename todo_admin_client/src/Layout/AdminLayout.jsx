import { Outlet } from "react-router-dom";
import { AdminHeader } from "../Components/AdminPanel/Header";
import { AdminFooter } from "../Components/AdminPanel/Footer";
import { ToastContainer } from "react-toastify";
import { SideMenu } from "../Components/AdminPanel/SideMenu";
import { SubMenuSidebar } from "../Components/AdminPanel/SubMenuSidebar";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useState } from "react";

export const AdminLayout = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <ToastContainer autoClose={1000} />
        <div className="absolute top-0 start-0 h-screen w-[70px] bg-blue-primary z-99">
          <SideMenu />
          <span className="absolute top-5 start-[100%] block bg-white border-1 border-solid border-[#000] p-2 z-[9999] hover:bg-gray-800 hover:text-white cursor-pointer" onClick={()=>setSubMenuOpen(true)}>
            <MdKeyboardDoubleArrowRight />
          </span>
        </div>

        <div className="absolute start-[70px] top-0 w-[200px] h-screen bg-gray z-[999]">
          <SubMenuSidebar />
        </div>

        <div className="absolute top-0 start-[70px] end-0 w-[calc(100%-70px)]">
          <AdminHeader />
          <Outlet />
          <AdminFooter />
        </div>
      </div>
    </>
  );
};
