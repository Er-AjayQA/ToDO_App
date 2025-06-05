import { useState } from "react";
import { FaHome, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../ContextAPI/AuthContext";

export const SideMenu = ({ menuList }) => {
  const [isActive, setIsActive] = useState("Home");
  const { companyId } = useAuth();

  const handleMenuActive = (name) => {
    setIsActive(name);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center text-white mb-3">
          <Link to={`/task-management/${companyId}`}>
            <img
              src="/Images/logo1.png"
              alt="Logo Image"
              className="w-[70px] h-[70px]"
            />
          </Link>
        </div>
        {menuList.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex items-center justify-center mb-2"
            >
              <Link
                className={`text-white text-xl p-3 rounded hover:bg-blue-dark ${
                  isActive === menu.name ? "bg-blue-dark" : ""
                }`}
                onClick={() => handleMenuActive(menu.name)}
              >
                {menu.icon}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
