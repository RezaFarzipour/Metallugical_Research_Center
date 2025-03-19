import React from "react";
import PaginationElement from "../PaginationElement";

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
      {/* Pagination Component */}
      <PaginationElement page={page} pages={pages} setPage={setPage} />
    </div>
  );
}
