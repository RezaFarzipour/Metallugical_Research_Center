import React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";

interface ViewToggleProps {
  view: boolean;
  setView: (view: boolean) => void;
}

const getIconClasses = (isActive: boolean) =>
  `rounded-sm text-3xl cursor-pointer transition-all duration-200 ${
    isActive ? "bg-blue-500 text-white" : "bg-transparent text-default-300"
  }`;

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex gap-2">
      <AiFillAppstore
        className={getIconClasses(view)}
        onClick={() => setView(true)}
      />

      <GoListUnordered
        className={getIconClasses(!view)}
        onClick={() => setView(false)}
      />
    </div>
  );
};

export default ViewToggle;
