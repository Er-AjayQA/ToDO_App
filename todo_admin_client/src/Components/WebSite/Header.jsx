import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="relative">
        {/* Logo Menu Start Here */}
        <nav className="sticky w-full z-20 top-0 start-0 bg-purple-dark border-b border-[#6B21A8] dark:border-[#6B21A8]">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
            <Link
              to="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/Images/logo2.png"
                className="h-12 w-auto md:h-16"
                alt="TaskTime Logo"
              />
              {/* <span className="hidden md:block self-center text-2xl text-white font-semibold whitespace-nowrap">
                TickTock
              </span> */}
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
              <button
                type="button"
                className="hidden md:block bg-purple-accent hover:bg-purple-hover text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Register
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={handleMobileMenu}
              >
                <RxHamburgerMenu />
              </button>
            </div>
          </div>
        </nav>
        {/* Logo Menu End Here */}

        {/* Mobile Menu Start Here */}
        {isMobileMenuOpen ? (
          <div
            className={`absolute top-[56px] start-0 end-0 ${
              isMobileMenuOpen ? "block" : ""
            }  md:flex md:w-auto md:order-1 border border-gray-100 bg-[#D8B4FE]`}
          >
            <ul className="w-[50%] flex flex-col p-4 md:p-0 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 mx-auto">
              <li>
                <Link
                  to="#"
                  className="block py-2 text-center px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-center text-gray-900 rounded-sm hover:text-purple-accent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-center text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-center text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
              <li className="text-center">
                <button
                  type="button"
                  className="text-white bg-purple-primary hover:bg-purple-hover font-medium rounded-lg text-sm px-4 py-2 text-center mx-auto"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        {/* Mobile Menu End Here */}

        {/* Main Menu Start Here */}
        <div className="hidden md:flex md:w-auto md:order-1 shadow-md shadow-purple-light">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mx-auto">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-purple-accent rounded-sm hover:bg-purple-dark hover:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-purple-dark hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-purple-dark  hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-purple-dark  hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Main Menu End Here */}
      </header>
    </>
  );
};
