"use client";
import { useEffect } from "react";
import { useToastStore } from "@/store/useToastSlice";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoInformationSharp } from "react-icons/io5";

const iconMap = {
  success: <FaCheck className="h-6 w-6 text-green-500" />,
  error: <MdOutlineErrorOutline className="h-6 w-6 text-red-500" />,
  warning: <IoWarningOutline className="h-6 w-6 text-yellow-500" />,
  info: <IoInformationSharp className="h-6 w-6 text-blue-500" />,
};

export const Toast = () => {
  const { open, message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-md bg-white w-[300px]`}
      >
        {iconMap[type]}
        <span className="text-sm text-gray-800">{message}</span>
      </div>
    </div>
  );
};
