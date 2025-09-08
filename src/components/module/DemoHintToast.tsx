"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function InfoToast() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* دسکتاپ: سمت راست بالای صفحه */}
      <div className="hidden lg:block fixed top-6 right-6 z-50 w-[480px]">
        <div className="relative rounded-xl bg-blue-600 text-white shadow-lg border border-blue-700 p-3 flex items-start gap-3">
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white mt-1"
          >
            <IoMdClose size={18} />
          </button>

          <div className="flex-1">
            <p className="text-sm leading-snug">
              برای ورود به داشبورد{" "}
              <span className="font-bold text-yellow-300">ادمین</span> با شماره{" "}
              <span className="font-bold text-yellow-300">09104466400</span>{" "}
              وارد شوید.
            </p>

            <p className="text-sm leading-snug mt-1">
              برای ورود به داشبورد{" "}
              <span className="font-bold text-green-300">کاربر</span> با شماره{" "}
              <span className="font-bold text-yellow-300">09190978042</span>{" "}
              وارد شوید.
            </p>
          </div>
        </div>
      </div>

      {/* موبایل: بالای فرم وسط‌چین */}
      <div className="block lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw]">
        <div className="relative rounded-lg bg-blue-600 text-white shadow-md border border-blue-700 p-2 text-xs flex items-start gap-2">
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white mt-1"
          >
            <IoMdClose size={16} />
          </button>

          <div className="flex-1">
            <p className="leading-snug">
              ورود به <span className="font-bold text-yellow-300">ادمین</span>:{" "}
              <span className="font-bold text-yellow-300">09104466400</span>
            </p>
            <p className="mt-1 leading-snug">
              ورود به <span className="font-bold text-green-300">کاربر</span>:{" "}
              <span className="font-bold text-yellow-300">09190978042</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
