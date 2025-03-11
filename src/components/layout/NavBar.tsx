"use client";

import React, { useEffect } from "react";
import { Navbar } from "@heroui/react";
import { NavBarRight } from "./Components/NavBarRight";
import { NavBarLeft } from "./Components/NavBarLeft";
import MobileMenu from "./Components/MobileMenu";

const navbarStyles = {
  base: "z-10 shadow-md bg-inherit mb-10 transition-all duration-200 border-b border-b-secondary-300",
  loading: (isLoading: boolean) =>
    isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0",
};

const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      setIsLoading(false)
    );
  }, []);

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className={`${navbarStyles.base} ${navbarStyles.loading(isLoading)}`}
    >
      <NavBarRight isMenuOpen={isMenuOpen} />
      <NavBarLeft />
      <MobileMenu />
    </Navbar>
  );
};

export default Header;
