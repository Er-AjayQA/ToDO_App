import { Outlet } from "react-router-dom";
import { AdminHeader } from "../Components/AdminPanel/Header";
import { AdminFooter } from "../Components/AdminPanel/Footer";
import { ToastContainer } from "react-toastify";
import { SideMenu } from "../Components/AdminPanel/SideMenu";
import { SubMenuSidebar } from "../Components/AdminPanel/SubMenuSidebar";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdChecklist,
  MdOutlineNoteAlt,
} from "react-icons/md";
import { FaHome, FaBriefcase } from "react-icons/fa";

import { useState } from "react";

export const AdminLayout = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Home",
      icon: <FaHome />,
      subMenu: [
        { id: 1.1, name: "Home", icon: <MdChecklist /> },
        { id: 1.2, name: "Notepad", icon: <MdOutlineNoteAlt /> },
      ],
    },
    {
      id: 2,
      name: "Projects",
      icon: <FaBriefcase />,
      subMenu: [],
    },
  ]);

  return (
    <>
      <div className="relative">
        <ToastContainer autoClose={1000} />
        <div className="absolute top-0 start-0 h-screen w-[70px] bg-blue-primary z-[99999]">
          <SideMenu menuList={menu} />

          <span
            className={`absolute top-4  block bg-white w-[29px] h-[25px] flex items-center justify-end border-1 border-solid border-[#000] p-1 z-[99] hover:bg-gray-500 hover:text-white cursor-pointer translate-x-[-10px] rounded-r-lg transition-all duration-[.2s] ease-in-out ${
              !subMenuOpen
                ? "start-[114%] bg-white z-[99]"
                : "start-[50%] bg-gray-500 z-[-9999] opacity-0"
            }`}
            onClick={() => setSubMenuOpen(true)}
          >
            <MdKeyboardDoubleArrowRight />
          </span>
        </div>

        <div
          className={`absolute  top-0 w-[200px] border-e border-e-gray-300 border-e-solid h-screen z-[9999] transition-all duration-[.2s] ease-in-out ${
            subMenuOpen ? "start-[70px]" : "start-[-170px]"
          }`}
        >
          <SubMenuSidebar menuList={menu} />
          {subMenuOpen && (
            <span
              className="absolute top-3 start-[92%] flex items-center justify-center bg-white w-[30px] h-[30px] rounded-[50%] border border-solid border-[#000] p-2 z-[9999] hover:bg-gray-500 hover:text-white cursor-pointer"
              onClick={() => setSubMenuOpen(false)}
            >
              <MdKeyboardDoubleArrowLeft />
            </span>
          )}
        </div>

        <div
          className={`absolute top-0  end-0 transition-all duration-[.2s] ease-in-out ${
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
