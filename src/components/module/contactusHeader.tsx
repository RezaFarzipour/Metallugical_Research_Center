import React from "react";
import BreadcrumbsElement from "../element/Breadcrumbs";

const ContactusHeader = () => {
  return (
    <header className="relative w-full h-96 bg-[url('/images/contactus.jpg')] bg-cover bg-center">
      {/* لایه‌ی تیره */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* محتوای هدر */}
      <div className="relative z-10 flex items-center justify-start h-full mr-14 text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold">ارتباط با ما</h1>
          <BreadcrumbsElement item1="خانه" item2="ارتباط با ما" />
        </div>
      </div>
    </header>
  );
};

export default ContactusHeader;
