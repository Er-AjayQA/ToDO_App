import { Outlet } from "react-router-dom";
import { AdminHeader } from "../Components/AdminPanel/Header";
import { AdminFooter } from "../Components/AdminPanel/Footer";
import { ToastContainer } from "react-toastify";
import { SideMenu } from "../Components/AdminPanel/SideMenu";
import { SubMenuSidebar } from "../Components/AdminPanel/SubMenuSidebar";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import { useState } from "react";

export const AdminLayout = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <ToastContainer autoClose={1000} />
        <div className="absolute top-0 start-0 h-screen w-[70px] bg-blue-primary z-[9999]">
          <SideMenu />
          {!subMenuOpen && (
            <span
              className="absolute top-4 start-[114%] block bg-white w-[29px] h-[25px] flex items-center justify-end border-1 border-solid border-[#000] p-1 z-[99] hover:bg-gray-500 hover:text-white cursor-pointer translate-x-[-10px] rounded-r-lg"
              onClick={() => setSubMenuOpen(true)}
            >
              <MdKeyboardDoubleArrowRight />
            </span>
          )}
        </div>

        {subMenuOpen && (
          <div className="absolute start-[70px] top-0 w-[200px] border-e border-e-gray-300 border-e-solid h-screen  z-[9999]">
            <SubMenuSidebar />
            {subMenuOpen && (
              <span
                className="absolute top-3 start-[92%] flex items-center justify-center bg-white w-[30px] h-[30px] rounded-[50%] border border-solid border-[#000] p-2 z-[9999] hover:bg-gray-500 hover:text-white cursor-pointer"
                onClick={() => setSubMenuOpen(false)}
              >
                <MdKeyboardDoubleArrowLeft />
              </span>
            )}
          </div>
        )}

        <div
          className={`absolute top-0  end-0  ${
            subMenuOpen
              ? "start-[270px] w-[calc(100%-270px)]"
              : "start-[70px] w-[calc(100%-70px)]"
          }`}
        >
          <AdminHeader />
          <Outlet />
          <AdminFooter />
        </div>
      </div>
    </>
  );
};
