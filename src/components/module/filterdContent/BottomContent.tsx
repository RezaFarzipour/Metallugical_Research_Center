import React from "react";
import { Pagination } from "@heroui/react";

interface BottomContentProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}

export default function BottomContent({
  page,
  pages,
  setPage,
}: BottomContentProps) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
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
    </div>
  );
}
