"use client";
import { BtnLoader } from "@/components/element/Loader";
import { useGetUser } from "@/hooks/useAuth";
import { patchReserveDetails } from "@/services/api/reserve";
import { getServicesByIdCustomer } from "@/services/api/service";
import { showToast } from "@/store/useToastSlice";
import { cn } from "@/utils/cn";
import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import BlurModal from "@/components/element/BlurModal";
import Stage1ModalBody from "./Stage1ModalBody";
import { serviceDataEditType } from "@/types/serviceType";
import { Select, SelectItem } from "@heroui/react";

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
  is_package: boolean;
  "service-images": ServiceImage[];
  "service-reserve_date"?: ServiceReserveDate[];
}

const Stage1 = ({ allServices, isAllServicesPending }: stage1Props) => {
  const searchParams = useSearchParams();
  const reserveId = searchParams.get("reserve-id");
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | null | undefined
  >(null);
  const [modalService, setModalService] = useState<ServiceDataType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"package" | "service">(
    "service"
  );

  const queryClient = useQueryClient();

  const { mutateAsync: patchReserve, isPending: isPatching } = useMutation({
    mutationKey: ["patch-reserve"],
    mutationFn: patchReserveDetails,
  });

  const { data: userData } = useGetUser();

  const handleReserveClick = async (serviceId: string | undefined) => {
    try {
      const data = await getServicesByIdCustomer(String(serviceId));
      setSelectedServiceId(serviceId);
      setModalService(data);
      setIsModalOpen(true);
    } catch (err) {
      alert(err);
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
      alert(e);
      showToast("خطایی رخ داده است", "error");
    }
  };

  const { reserved_from, reserved_to } =
    modalService?.["service-reserve_date"]?.[0] || {};

  const rangeHandler = (reserved_from: Date, reserved_to: Date) => {
    setStartDate(reserved_from.toISOString().split("T")[0]);
    setEndDate(reserved_to.toISOString().split("T")[0]);
  };

  const isPackage = filterType === "package";

  const filteredServices = Array.isArray(allServices)
    ? allServices.filter((service) => {
        if (filterType === "package") return service.is_package === true;
        if (filterType === "service") return service.is_package === false;
        return true;
      })
    : [];



  if (isAllServicesPending) return <BtnLoader />;
  const isConfirmDisabled = !startDate || !endDate;

  return (
    <div className="w-full container rounded-xl h-auto bg-white p-4 ">
      <p className="font-bold text-md my-3">انتخاب سرویس</p>

      {/* Select Box */}
      <div className="mb-6 w-full max-w-xs">
        <Select
          label="نوع فیلتر"
          placeholder="انتخاب نوع"
          selectedKeys={new Set([filterType])}
          onSelectionChange={(key) => {
            const value = typeof key === "string" ? key : Array.from(key)[0];
            setFilterType(value as "package" | "service");
            console.log("انتخاب شد:", value);
          }}
          className="max-w-xs"
        >
          <SelectItem key="package">دوره‌ها</SelectItem>
          <SelectItem key="service">دستگاه ها</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
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
                  src={service.cover_image || ""}
                  alt={service.service_name || ""}
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
                  قیمت: {service.price?.toLocaleString()} تومان
                </p>
                <Button
                  className="text-white bg-gradient-to-r from-secondary-500 to-secondary-700 hover:from-secondary-600 hover:to-secondary-800"
                  onPress={() => handleReserveClick(service.id)}
                >
                  رزرو
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <BlurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isPatching={isPatching}
      
        title="رزرو"
        heightProp="lg"
        bodyContent={
          modalService ? (
            <Stage1ModalBody
            isPackage ={isPackage}
              reserved_from={reserved_from}
              reserved_to={reserved_to}
              rangeHandler={rangeHandler}
              serviceData={modalService}
            />
          ) : (
            <BtnLoader />
          )
        }
        onConfirm={handleConfirm}
        disabled={isConfirmDisabled}
      />
    </div>
  );
};

export default Stage1;
