import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header";
import { Home } from "../Pages/Home";
import { Footer } from "../Components/Footer";

export const RootLayout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
