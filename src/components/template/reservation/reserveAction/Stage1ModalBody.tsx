import CarGallery from "@/components/module/ImageGallery";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import CustomeDateRangePicker from "@/components/module/customeDataPicker/CustomeCallender";
import React from "react";

interface ServiceImage {
  id: number;
  image: string;
  service: number;
}

interface ServiceReserveDate {
  id: string;
  reserved_from: string;
  reserved_to: string;
  service: number;
}

interface ServiceDataType {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImage[];
  "service-reserve_date"?: ServiceReserveDate[];
}

interface CustomeDateRangePickerProps {
  reserved_from: string | undefined;
  reserved_to: string | undefined;
  rangeHandler: (minDate: Date, maxDate: Date) => void;
  serviceData: ServiceDataType;
}

const Stage1ModalBody = ({
  serviceData,
  rangeHandler,
  reserved_to,
  reserved_from,
}: CustomeDateRangePickerProps) => {
  const BASE_URL = "http://localhost:8000";

  const {
    service_name,
    description,
    price,
    "service-images": serviceImages,
  } = serviceData;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http") ? img.image : BASE_URL + img.image
    ) || [];

  return (
    <div className="w-full flex items-center flex-col gap-8">
      {/* title and price */}
      <div className="w-full lg:w-1/2  p-4 bg-white shadow rounded-lg space-y-2">
        {/* ردیف اول: نام دستگاه */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">نام دستگاه</p>
          <p className="font-bold text-sm text-[#0485c7]">{service_name}</p>
        </div>

        {/* ردیف دوم: قیمت */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">قیمت</p>
          <p className="font-bold text-sm text-[#0485c7]">
            {toPersianNumbersWithComma(price)} تومان
          </p>
        </div>

        {/* ردیف سوم: توضیحات */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm">توضیح</p>
          <p className="text-sm text-default-300">{description}</p>
        </div>
      </div>

      {/* content section: image gallery + calendar */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20">
        {/* left section: image gallery */}
        <div className="w-full lg:w-1/2 flex   justify-center lg:justify-start items-center">
          <CarGallery images={galleryImages} />
        </div>

        {/* right section: date picker */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 p-2">
          <CustomeDateRangePicker
            onRangeSelect={rangeHandler}
            reserveData={{
              reserved_from: reserved_from || "",
              reserved_to: reserved_to || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stage1ModalBody;
