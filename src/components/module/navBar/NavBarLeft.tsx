import { Button, NavbarContent, NavbarItem } from "@heroui/react";
import { IoEnterOutline } from "react-icons/io5";
import { UserProfileResponse } from "@/types";
import { DropDown } from "./NavDropDown";
import { dropDownItems } from "@/constants/data";
import Link from "next/link";

export const NavBarLeft = ({
  user,
}: {
  user: UserProfileResponse[] | null;
}) => {
  return (
    <NavbarContent justify="end">
      {user ? (
        <NavbarItem className=" flex">
          <DropDown user={user} dropDownItems={dropDownItems} />
        </NavbarItem>
      ) : (
        <NavbarItem>
          <Button
            href="/auth"
            className="text-white  bg-secondary-600 py-2 text-sm  rounded-md hover:bg-secondary-700 transition duration-300"
            endContent={<IoEnterOutline fontWeight={"bold"} size={"20px"} />}
          >
            <Link href={"/auth"}>ورود</Link>
          </Button>
        </NavbarItem>
      )}
    </NavbarContent>
  );
};
