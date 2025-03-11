"use client";
import React from "react";
import Footer from "./Components/Footer";
import NavBar from "./Components/navBar/page";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
