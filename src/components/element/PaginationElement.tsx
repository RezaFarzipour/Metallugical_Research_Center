import { Pagination } from "@heroui/react";
import React from "react";

type PaginationProps = {
  page: number;
  pages: number;
  setPage: (page: number) => void;
};

const PaginationElement: React.FC<PaginationProps> = ({
  page,
  pages,
  setPage,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        dir="ltr"
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={pages}
        onChange={setPage}
        variant="flat"
        classNames={{
          cursor: " text-white ",
        }}
      />
    </div>
  );
};

export default PaginationElement;
