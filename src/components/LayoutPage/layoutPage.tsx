import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/footer";

const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPage;
