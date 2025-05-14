import CarGallery from "@/components/module/ImageGallery";
import { sp } from "@/utils/formatter/numberFormatter";
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
    <div className="w-full  flex flex-col lg:flex-row justify-between items-start gap-32 ">
      {/* left section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
        <CarGallery images={galleryImages} />
        {/* title and price */}
        <div className="flex w-full my-2 justify-between p-2">
          <p className="font-bold text-xl text-[#0485c7]">{sp(price)} تومان</p>
          <p className="font-bold text-xl">{service_name}</p>
        </div>
        {/* description */}
        <div className="w-full p-2">
          <p className="text-sm text-default-300">{description}</p>
        </div>
      </div>

      {/* right section */}
  
      <div className="w-full lg:w-1/2 flex flex-col gap-4 p-2">
    
        <CustomeDateRangePicker
          onRangeSelect={rangeHandler}
          reserveData={{
            reserved_from: reserved_from || "",
            reserved_to: reserved_to || "",
          }}
        />
      </div>
    </div>
  );
};

export default Stage1ModalBody;
