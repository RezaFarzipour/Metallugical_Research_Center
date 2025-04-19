import { NavbarContent, NavbarItem } from "@heroui/react";

import NavLink from "./NavLink";

export const NavBarLeft = () => (
  <NavbarContent justify="end">
    <NavbarItem className="hidden lg:flex">
      <NavLink path="/admin" style={false}>
        پروفایل
      </NavLink>
    </NavbarItem>
    <NavbarItem>
      <NavLink path="/auth" style={false}>
        ورود
      </NavLink>
    </NavbarItem>
  </NavbarContent>
);
