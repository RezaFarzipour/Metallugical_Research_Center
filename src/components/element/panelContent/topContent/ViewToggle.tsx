import React, { useCallback } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";

interface ViewToggleProps {
  setView: (view: boolean) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ setView }) => {
  const handleGridView = useCallback(() => setView(true), [setView]);
  const handleListView = useCallback(() => setView(false), [setView]);

  return (
    <div className="flex gap-2 text-default-300 text-3xl cursor-pointer">
      <AiFillAppstore onClick={handleGridView} />
      <GoListUnordered onClick={handleListView} />
    </div>
  );
};

export default ViewToggle;
