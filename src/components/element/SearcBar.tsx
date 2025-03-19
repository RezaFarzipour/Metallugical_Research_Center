import React from "react";
import { Input } from "@heroui/react";
import { IoIosSearch } from "react-icons/io";

type SearcBarProps = {
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
};

const SearcBar: React.FC<SearcBarProps> = ({
  filterValue,
  onSearchChange,
  onClear,
}) => {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="جستجو کنید"
      startContent={<IoIosSearch />}
      value={filterValue}
      onClear={onClear}
      onValueChange={onSearchChange}
    />
  );
};

export default SearcBar;
