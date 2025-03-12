import { NavbarContent, NavbarItem, Badge } from "@heroui/react";
import { TbBasket } from "react-icons/tb";
import { toPersianDigits } from "@/utils/numberFormatter";
import NavLink from "./NavLink";

export const NavBarLeft = () => (
  <NavbarContent justify="end">
    <NavbarItem>
      <NavLink path="/cart" style={false}>
        <div className="relative mt-2">
          <Badge
            color="primary"
            content={toPersianDigits(0)}
            className="absolute -right-2 bg-secondary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            <TbBasket className="text-xl" />
          </Badge>
        </div>
      </NavLink>
    </NavbarItem>
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
