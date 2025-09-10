"use client";
import CarGallery from "@/components/module/ImageGallery";
import React from "react";
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
import { useReservationSource } from "@/store/useReservationSource";
import { getHttpsUrl } from "@/utils/formatter/domainFormatter";
const CourseDetailsPage = ({ serviceData }: { serviceData: ServiceData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setSource } = useReservationSource();
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

  const coverImageSrc = getHttpsUrl(cover_image);

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
    setSource("course");
    try {
      const { id } = await createServiceReserve();
      await patchReserve({
        reserve_from: "",
        reserve_to: "",
        service: serviceId.toString(),
        reserveId: id,
      });

      router.push(`/reservation?reserve-id=${id}&next-stage=1`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "رزرو با خطا مواجه شد";
      showToast(errorMessage, "error");
    }
  };

  const coursePath = pathname.includes("courses");

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-16 mt-96 mb-16 md:my-16">
      <div className="w-full flex flex-col gap-6">
        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <ServiceDetailRightSection
            coverImageSrc={coverImageSrc}
            service_name={service_name}
          />
        </div>

        <div className="px-4 sm:pr-12 w-full">
          <h2 className="text-md text-gray-500 font-bold">توضیحات</h2>
          <p className="text-justify text-sm text-gray-800 pt-2 break-words whitespace-normal leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-around mt-4 gap-8">
          {!coursePath ? (
            <div className="my-6 flex item-start">
              <CarGallery images={galleryImages} />
            </div>
          ) : null}

          <div className="w-full lg:w-[50%] pt-5">
            <ServiceDetailLeftSection
              course={true}
              price={price}
              reserve_date={reserve_date}
              handleConfirm={handleConfirm}
              reserved_from={reserved_from}
              reserved_to={reserved_to}
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
