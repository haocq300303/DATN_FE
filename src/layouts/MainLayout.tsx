import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Banner from "./Banner/Banner";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Banner />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
