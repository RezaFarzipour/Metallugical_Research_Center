import { siteConfig } from "@/config/site";
import { NavbarMenu, NavbarMenuItem } from "@heroui/react";
import Link from "next/link";
import React from "react";

const MobileMenu = () => {
  return (
    <NavbarMenu>
      {siteConfig.navItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link className="w-full text-secondary-900/80 " href={item.path}>
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};

export default MobileMenu;
