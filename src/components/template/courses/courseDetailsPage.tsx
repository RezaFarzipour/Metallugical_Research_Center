"use client";
import CarGallery from "@/components/module/ImageGallery";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useAuth";
import {
  patchReserveDetails,
  postReservedService,
} from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import ServiceDetailRightSection from "@/components/module/serviceModule/ServiceDetailRightSection";
import ServiceDetailLeftSection from "@/components/module/serviceModule/ServiceDetailLeftSection";
import { ServiceData } from "@/types/serviceType";
import { usePathname } from "next/navigation";
const CourseDetailsPage = ({ serviceData }: { serviceData: ServiceData }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { reserved_from, reserved_to } =
    serviceData?.["service-reserve_date"]?.[0] || {};

  const {
    id: serviceId,
    service_name,
    price,
    cover_image,
    "service-images": serviceImages,
    "service-reserve_date": reserve_date,
    description,
  } = serviceData;

  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : process.env.NEXT_PUBLIC_IMAGE_BASE_URL + cover_image;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http")
        ? img.image
        : process.env.NEXT_PUBLIC_IMAGE_BASE_URL + img.image
    ) || [];

  const { mutateAsync: createServiceReserve, isPending: isCreating } =
    useMutation({
      mutationKey: ["post-reserve"],
      mutationFn: postReservedService,
    });

  const { mutateAsync: patchReserve, isPending: isPatching } = useMutation({
    mutationKey: ["patch-reserve"],
    mutationFn: patchReserveDetails,
  });

  const { data: userData } = useGetUser();

  const handleConfirm = async () => {
    if (!userData || userData.length === 0) {
      router.push("/auth");
      return;
    }

    if (userData?.role === "admin") {
      showToast("لطفا به عنوان کاربر عادی وارد شوید", "error");
      return;
    }

    try {
      const { id } = await createServiceReserve();
      await patchReserve({
        reserve_from: startDate,
        reserve_to: endDate,
        service: serviceId.toString(),
        reserveId: id,
      });

      router.push(`/reservation?reserve-id=${id}&next-stage=1`);
    } catch (e) {
      console.log("err", e);
    }
  };

  const isConfirmDisabled = (() => {
    if (!reserved_from || !reserved_to) return true;

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // مثلاً "2025-08-04"

    return reserved_from < todayStr || reserved_to < todayStr;
  })();

  const coursePath = pathname.includes("courses");

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-16">
      <div className="w-full flex flex-col gap-6">
        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <ServiceDetailRightSection
            coverImageSrc={coverImageSrc}
            service_name={service_name}
          />
        </div>

        <div className="pr-12">
          <h2 className="text-md text-gray-500 font-bold">توضیحات</h2>
          <p className="text-justify text-sm text-gray-800 pr-4 pt-2">
            {description}
          </p>
        </div>

        <div className="flex justify-around mt-4 gap-8">
          {!coursePath ? (
            <div className="my-6 flex item-start">
              <CarGallery images={galleryImages} />
            </div>
          ) : null}

          <div className="w-full lg:w-[70%] pt-5">
            <ServiceDetailLeftSection
              course={true}
              price={price}
              reserve_date={reserve_date}
              handleConfirm={handleConfirm}
              reserved_from={reserved_from}
              reserved_to={reserved_to}
              isConfirmDisabled={isConfirmDisabled}
              isCreating={isCreating}
              isPatching={isPatching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
