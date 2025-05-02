"use client";
import CarGallery from "@/components/module/ImageGallery";
import { sp } from "@/utils/formatter/numberFormatter";
import Image from "next/image";
import React, { useState } from "react";
import BlurModal from "../element/BlurModal";
import ServicesReserveModalBody from "../module/ServicesReserveModalBody";
import { useMutation } from "@tanstack/react-query";
import { postReservedService } from "@/services/api/service";


interface ServiceImage {
  id: number;
  image: string;
  service: number;
}

interface ServiceDataType {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImage[];
}

const ServiceDetails = ({ serviceData }: { serviceData: ServiceDataType }) => {
  const BASE_URL = "http://localhost:8000";
  const [startDate, setStartDate] = useState<string | null>("");
  const [endDate, setEndDate] = useState<string | null>("");

  const { isPending, mutateAsync, data, error } = useMutation({
    mutationKey: ["post-reserve"],
    mutationFn: postReservedService,
  

    onSuccess: (data) => {
      console.log("data", data);
    },

    onError: (error) => {
      console.log("error", error);
    },
  });


  

  const {
    id,
    service_name,
    description,
    price,
    cover_image,
    "service-images": serviceImages,
  } = serviceData;



  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : BASE_URL + cover_image;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http") ? img.image : BASE_URL + img.image
    ) || [];

  const handleConfirm = async () => {
    await mutateAsync();
  };

  return (
    <div className=" flex flex-col md:flex-row items-center justify-center gap-16 container py-20">
      {/* right section */}
      <div className="w-full flex flex-col gap-4 mx-10 mb-10 md:mb-0">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative w-16 h-16">
            <Image
              className="rounded-full object-cover"
              alt={service_name}
              fill
              src={coverImageSrc}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{service_name}</h2>
        </div>
        <p className="wrap text-justify text-default-400 mb-5">{description}</p>

        <div className="text-center my-5  font-bold text-2xl">
          قیمت محصول:{sp(price)}
        </div>

        <div className="flex justify-center w-full">
          <BlurModal
            heightProp="md"
            title="رزرو کنید"
            bodyContent={
              <ServicesReserveModalBody
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            }
            onConfirm={handleConfirm}
          />
        </div>
      </div>

      {/* left section */}
      <div className="w-full mb-10 md:mb-0">
        <CarGallery images={galleryImages} />
      </div>
    </div>
  );
};

export default ServiceDetails;
