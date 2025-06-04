import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../ContextAPI/AuthContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const [logoutMenuDisplay, setLogoutMenuDisplay] = useState(false);

  const { dropdownRef } = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const handleShowLogoutMenu = () => {
    setLogoutMenuDisplay(true);
  };

  const handleCloseLogoutMenu = () => {
    setLogoutMenuDisplay(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogoutMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 start-0 shadow-md">
        <nav className="flex justify-between p-4 items-center">
          <div className="">BreadCrumb</div>
          <div className="relative">
            <div
              className="flex items-center gap-3"
              onClick={handleShowLogoutMenu}
              ref={dropdownRef}
            >
              <button className="p-2 font-bold bg-blue-accent rounded-[50%]">
                {user.avatar}
              </button>
              <span className="block">{user.name}</span>
            </div>

            <div
              className={`absolute top-100 end-0 w-[200px] ${
                logoutMenuDisplay ? "block" : "hidden"
              }`}
            >
              <ul className="py-2 bg-white shadow-md">
                <li>
                  <Link
                    to=""
                    className="hover:bg-gray-100 block p-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
