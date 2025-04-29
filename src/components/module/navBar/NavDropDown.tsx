import { dropDownItemType } from "@/constants/data";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";


// interface DropDownProps {
//   user: User;
//   dropDownItems: (role: string) => dropDownItemType[];
// }

export const DropDown = ({ user, dropDownItems }) => {
  const userRoles = user && user.role;

  return (
    <Dropdown placement="bottom" className="w-[230px] ">
      <DropdownTrigger>
        <div className="flex items-center px-1 py-2 border-2 border-[#ddd] rounded-full">
          <CgProfile className="text-default-500" />
          <FaAngleDown className="text-default-400" />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-16 gap-2">
          <div className="flex flex-col gap-2 justify-center ">
            <p className="text-[12px] flex items-center gap-2 font-bold">
              <span>
                <FaRegUser size={"17px"} />
              </span>
              {user?.first_name}
            </p>
            <p className="text-[12px] flex items-center gap-2 font-bold">
              <span>
                <MdOutlinePhoneEnabled size={"17px"} />
              </span>
              {user?.phone_number}
            </p>
          </div>

          <div className=" my-2 border-b-1 border-[#ddd]"></div>
        </DropdownItem>

        {dropDownItems(userRoles).map((item: dropDownItemType) => {
          const Icon = item.icon;
          return (
            <DropdownItem
            href={item.path}
            
              key={item.label}
            >
              <div
             
                className="flex gap-1 text-[12px] group-hover:text-blue-600 transition-colors duration-100"
              >
                 <Icon
                  size="17px"
                  className="text-default-500 group-hover:text-blue-600 transition-colors duration-100"
                />
                {item.label}
              </div>
            </DropdownItem>
          );
        })}

        <DropdownItem
          startContent={<IoExitOutline size="17px" />}
          key="logout"
          color="danger"
        >
          خروج
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
