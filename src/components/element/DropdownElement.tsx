import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { LuChevronDown } from "react-icons/lu";

interface Option {
  uid: string;
  name: string;
}

export const DropdownElement: React.FC<{
  label: string;
  options: Option[];
  selectedKeys: string | Set<string>;
  onSelectionChange: (keys: any) => void;
}> = ({ label, options, selectedKeys, onSelectionChange }) => (
  <Dropdown>
    <DropdownTrigger className="hidden sm:flex">
      <Button
        endContent={<LuChevronDown className="text-small" />}
        variant="flat"
      >
        {label}
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      onSelectionChange={onSelectionChange}
      disallowEmptySelection
      aria-label={label}
      closeOnSelect={false}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
    >
      {options.map((option) => (
        <DropdownItem key={option.uid} className="capitalize">
          {option.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);
