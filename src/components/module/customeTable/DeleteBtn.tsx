import { Tooltip } from "@heroui/react";
import React from "react";

interface DeleteBtnProps {
  data: {
    id: number | string;
    phone_number?:string
  };
  secondActionContent: string;
  secondActionIcon?: React.FC;
  secondActionClickHandler: (id: number | string,phone_number:string) => void;
}

const DeleteBtn: React.FC<DeleteBtnProps> = ({
  data,
  secondActionContent,
  secondActionIcon: SecondIcon,
  secondActionClickHandler,
}) => {

  console.log("name,",data)
  return (
    <div>
      <Tooltip content={secondActionContent}>
        <span
          className="text-lg text-red-500 cursor-pointer hover:opacity-50"
          onClick={() => secondActionClickHandler(data.id,data?.name,data?.phone_number??"")}
        >
          {SecondIcon ? <SecondIcon /> : secondActionContent}
        </span>
      </Tooltip>
    </div>
  );
};

export default DeleteBtn;
