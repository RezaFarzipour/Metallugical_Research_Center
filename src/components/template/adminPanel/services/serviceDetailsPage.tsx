import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import CarGallery from "@/components/module/ImageGallery";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import Image from "next/image";
import React from "react";

const ServiceDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="سرویس"
          panelHref="/admin/services"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative w-16 h-16">
              <Image
                className="rounded-full object-cover"
                alt="Product Image"
                fill
                src="/images/blog1-img1.png"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">اسم محصول</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt,
            optio ex nostrum laudantium minima nemo alias iure, est error autem,
            magnam minus esse consequatur nihil. Magnam ipsa sit itaque quas
            saepe repellendus vel quaerat iste corporis debitis minus odit ex
          </p>

          <div className="text-center">
            <span className="text-2xl font-bold text-primary-600">
              قیمت محصول: {toPersianNumbersWithComma(100000)}
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full">
          <CarGallery />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
