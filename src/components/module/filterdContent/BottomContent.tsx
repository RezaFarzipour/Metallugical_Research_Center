import React, { useEffect } from "react";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect for updating page from URL query
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [searchParams, setPage]);

  // Handle page change and update query
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    setPage(newPage); // Update local page state
  };

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
          onChange={handlePageChange} // Handle page change with URL update
          variant="flat"
          classNames={{
            cursor: " text-white ",
          }}
        />
      </div>
    </div>
  );
}
