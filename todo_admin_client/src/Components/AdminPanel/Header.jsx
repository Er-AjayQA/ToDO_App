import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../ContextAPI/AuthContext";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const [logoutMenuDisplay, setLogoutMenuDisplay] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
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
    <header className="sticky top-0 start-0 border-b border-b-solid border-b-gray-300 bg-white z-50">
      <nav className="flex justify-between px-8 py-[8px] items-center">
        <div className="">BreadCrumb</div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLogoutMenuDisplay(!logoutMenuDisplay)}
          >
            <button className="p-2 font-bold bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
              {user?.avatar ||
                (user?.name ? user.name.charAt(0).toUpperCase() : "U")}
            </button>
            <span className="block">{user?.name || "User"}</span>
          </div>

          {logoutMenuDisplay && (
            <div className="absolute top-full right-0 w-48 mt-2 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1">
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
