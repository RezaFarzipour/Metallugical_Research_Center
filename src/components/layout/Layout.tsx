"use client";
import React from "react";
import Footer from "./containers/Footer";
import NavBar from "./containers/NavBar";

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
