"use client";
import { Input } from "@heroui/react";
import { IoIosSearch } from "react-icons/io";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTableStore } from "@/store/useTableSlice";
interface TopContentProps {
  tableStore: typeof useTableStore;
}

export default function SearchField({ tableStore }: TopContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { setFilterValue, setPage } = tableStore();

  useEffect(() => {
    if (searchQuery) setFilterValue(searchQuery);
  }, [searchQuery, setFilterValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.search as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setFilterValue(value);
    setPage(1);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setFilterValue("");
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit} className="relative  w-full sm:max-w-[44%]">
      <Input
        name="search"
        placeholder="جستجو کنید"
        defaultValue={searchQuery}
        startContent={<IoIosSearch />}
        isClearable
        onClear={handleClear}
      />
    </form>
  );
}
