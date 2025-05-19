"use client";
import useMoveBack from "@/hooks/userMoveBack";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";

import { HiArrowRight } from "react-icons/hi";

function NotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container xl:max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-md">
            <h1 className="text-9xl font-bold text-secondary-700 mb-4">
              {toPersianNumbersWithComma(404)}
            </h1>
            <h2 className="text-2xl font-bold text-primary-800 mb-8">
              صفحه ای که دنبالش بودید، پیدا نشد
            </h2>
            <p className="text-gray-600 mb-8">
              متاسفانه صفحه مورد نظر شما در دسترس نیست. لطفا به صفحه قبل برگردید
              یا از منوی اصلی استفاده کنید.
            </p>
            <button
              onClick={moveBack}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-secondary-700 rounded-lg hover:bg-primary-800 transition-colors duration-200 gap-x-2"
            >
              <HiArrowRight className="w-6 h-6" />
              <span>برگشت</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
