import Logo from "@/components/element/Logo";
import { siteConfig } from "@/config/site";
import { NavbarContent, NavbarBrand, NavbarMenuToggle } from "@heroui/react";
import NavLink from "./NavLink";
import Link from "next/link";

interface NavbarLeftProps {
  isMenuOpen: boolean;
}

export const NavBarRight = ({ isMenuOpen }: NavbarLeftProps) => (
  <NavbarContent justify="start">
    <NavbarMenuToggle
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      className="sm:hidden text-secondary-900 "
    />
    <NavbarBrand>
      <Link href={"/"}>
        <Logo />
      </Link>

      <NavbarContent className="hidden sm:flex gap-4 pr-12 lg:pr-6">
        {siteConfig.navItems.map((navLink) => {
          return (
            <li key={navLink.id}>
              <NavLink path={navLink.path}>{navLink.label}</NavLink>
            </li>
          );
        })}
      </NavbarContent>
    </NavbarBrand>
  </NavbarContent>
);
