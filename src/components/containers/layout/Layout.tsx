"use client";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

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
