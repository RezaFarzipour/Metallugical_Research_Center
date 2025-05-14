import React, { useEffect } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface ViewToggleProps {
  view: boolean;
  setView: (view: boolean) => void;
}

const getIconClasses = (isActive: boolean) =>
  `rounded-sm text-3xl cursor-pointer transition-all duration-200 ${
    isActive ? "bg-blue-500 text-white" : "bg-transparent text-default-300"
  }`;

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect for updating view from URL query
  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam) {
      setView(viewParam === "grid");
    }
  }, [searchParams, setView]);

  const handleViewChange = (newView: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("view", newView ? "grid" : "list");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <AiFillAppstore
        className={getIconClasses(view)}
        onClick={() => handleViewChange(true)}
      />

      <GoListUnordered
        className={getIconClasses(!view)}
        onClick={() => handleViewChange(false)}
      />
    </div>
  );
};

export default ViewToggle;
