"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  path: string;
  children: React.ReactNode;
  style?: boolean;
};

const NavLink = ({ path, children, style = true }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  const baseStyles = "block py-2  leading-none text-secondary-900/80";

  const activeStyles =
    style && isActive
      ? "border-b-2 border-b-secondary-600 text-secondary-900 border-t-2 border-t-secondary-600 rounded-[4px]"
      : "";

  const hoverStyles = style
    ? "hover:border-t-2 border-t-secondary-600 hover:rounded-[4px]"
    : "";

  return (
    <Link
      className={twMerge(baseStyles, activeStyles, hoverStyles)}
      href={path}
    >
      {children}
    </Link>
  );
};

export default NavLink;
