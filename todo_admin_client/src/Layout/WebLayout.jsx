import { Outlet } from "react-router-dom";
import { Header } from "../Components/WebSite/Header";
import { Footer } from "../Components/WebSite/Footer";

export const WebLayout = () => {
  return (
    <>
      <div className="h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
