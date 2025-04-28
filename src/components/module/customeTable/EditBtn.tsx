import { Tooltip } from "@heroui/react";
import React from "react";

interface EditBtnProps {
  data: {
    id: number | string;
    phone_number?: string;
  };
  firstActionContent: string;
  firstActionIcon?: React.FC;
  firstActionClickHandler: (id: number | string, phone_number: string) => void;
}

const EditBtn: React.FC<EditBtnProps> = ({
  data,
  firstActionContent,
  firstActionIcon: FirstIcon,
  firstActionClickHandler,
}) => {


  return (
    <div>
      <Tooltip content={firstActionContent}>
        <span
          className="text-lg text-gray-400 cursor-pointer hover:opacity-50"
          onClick={() =>
            firstActionClickHandler(data.id, data?.phone_number??"")
          }
        >
          {FirstIcon ? <FirstIcon /> : firstActionContent}
        </span>
      </Tooltip>
    </div>
  );
};

export default EditBtn;
