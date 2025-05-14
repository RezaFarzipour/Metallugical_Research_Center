"use client";
import { BtnLoader } from "@/components/element/Loader";
import { useGetUser } from "@/hooks/useAuth";
import { patchReserveDetails } from "@/services/api/reserve";
import { getServicesByIdCustomer } from "@/services/api/service";
import { showToast } from "@/store/useToastSlice";
import { serviceDataEditType } from "@/types";
import { cn } from "@/utils/cn";
import { Button } from "@heroui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Stage1ModalBody from "./Stage1ModalBody";
import { useQueryClient } from "@tanstack/react-query";
import BlurModal from "@/components/element/BlurModal";

type stage1Props = {
  allServices: serviceDataEditType[];
  isAllServicesPending: boolean;
};

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

const Stage1 = ({ allServices, isAllServicesPending }: stage1Props) => {
  const searchParams = useSearchParams();
  const reserveId = searchParams.get("reserve-id");
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [modalService, setModalService] = useState<ServiceDataType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: patchReserve, isPending: isPatching } = useMutation({
    mutationKey: ["patch-reserve"],
    mutationFn: patchReserveDetails,
  });

  const { data: userData } = useGetUser();

  const handleReserveClick = async (serviceId: number) => {
    try {
      const data = await getServicesByIdCustomer(String(serviceId));
      setSelectedServiceId(serviceId);
      setModalService(data);
      setIsModalOpen(true);
    } catch (err) {
      showToast("خطا در دریافت اطلاعات سرویس", "error");
    }
  };

  const handleConfirm = async () => {
    if (userData?.role === "admin") {
      showToast("لطفا به عنوان کاربر عادی وارد شوید", "error");
      return;
    }

    try {
      await patchReserve({
        reserve_from: startDate,
        reserve_to: endDate,
        service: modalService?.id.toString(),
        reserveId,
      });
      showToast("رزرو با موفقیت انجام شد", "success");
      queryClient.invalidateQueries({ queryKey: ["get-stage", reserveId] });
    } catch (e) {
      showToast("خطایی رخ داده است", "error");
    }
  };

  // handle reserve range
  const { reserved_from, reserved_to } =
    modalService?.["service-reserve_date"]?.[0] || {};

  const rangeHandler = (reserved_from: Date, reserved_to: Date) => {
    setStartDate(reserved_from.toISOString().split("T")[0]);
    setEndDate(reserved_to.toISOString().split("T")[0]);
  };

  if (isAllServicesPending) return <BtnLoader />;

  return (
    <div className="w-full container rounded-xl h-auto bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">انتخاب سرویس</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allServices.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={cn(
                "rounded-xl bg-white p-4 cursor-pointer transition hover:shadow-lg border",
                isSelected && "border-blue-500 ring-2 ring-blue-300"
              )}
            >
              <div className="w-full h-48 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src={service.cover_image}
                  alt={service.service_name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold mb-1">{service.service_name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {service.description}
              </p>
              <div className="flex w-full justify-between p-2 items-center">
                <p className="text-blue-600 font-semibold">
                  قیمت: {service.price.toLocaleString()} تومان
                </p>
                <Button
                  className="bg-blue-500 text-white"
                  onPress={() => handleReserveClick(service.id)}
                >
                  رزرو
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Section */}
      <BlurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isPatching={isPatching}
        title="رزرو"
        heightProp="lg"
        bodyContent={
          modalService ? (
            <>
              <Stage1ModalBody
                reserved_from={reserved_from}
                reserved_to={reserved_to}
                rangeHandler={rangeHandler}
                serviceData={modalService}
              />
            </>
          ) : (
            <BtnLoader />
          )
        }
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Stage1;
