"use client";

import BtnLoader from "@/components/element/BtnLoader";
import CustomeDateRangePicker from "@/components/module/customeDataPicker/CustomeCallender";
import { useGetUser } from "@/hooks/useAuth";
import {
  patchReserveDetails,
  postReservedService,
} from "@/services/api/reserve";
import { getServicesByIdCustomer } from "@/services/api/service";
import { showToast } from "@/store/useToastSlice";
import { serviceDataEditType } from "@/types";
import { cn } from "@/utils/style/Cn";
import { Button } from "@heroui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  //get service date
  const { data: selectedServiceData, isLoading: isServiceLoading } =
    useQuery<ServiceDataType>({
      queryKey: ["service-details", selectedServiceId],
      queryFn: () => getServicesByIdCustomer(String(selectedServiceId)),
      enabled: !!selectedServiceId,
    });

  //patch req after post request completed
  const { mutateAsync: patchReserve, isPending: isPatching } = useMutation({
    mutationKey: ["patch-reserve"],
    mutationFn: patchReserveDetails,
  });

  //destructure reserve_from and reserve_to from data

  const reserved_from =
    selectedServiceData?.["service-reserve_date"]?.[0]?.reserved_from || "";
  const reserved_to =
    selectedServiceData?.["service-reserve_date"]?.[0]?.reserved_to || "";

  //last function that we use in calender to show available dates for service
  const rangeHandler = (reservedFrom: Date, reservedTo: Date) => {
    setStartDate(reservedFrom.toISOString().split("T")[0]);
    setEndDate(reservedTo.toISOString().split("T")[0]);
  };

  const { data: userData } = useGetUser();

  //when user confirm service and date
  const handleConfirm = async () => {
    if (userData?.role === "admin") {
      showToast("لطفا به عنوان کاربر عادی وارد شوید", "error");
      return;
    }

    try {
      await patchReserve({
        reserve_from: startDate,
        reserve_to: endDate,
        service: selectedServiceData?.id.toString(),
        reserveId,
      });
    } catch (e) {
      console.log("err", e);
    }
  };

  if (isAllServicesPending) {
    return <BtnLoader />;
  }

  return (
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">انتخاب سرویس</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allServices.map((service) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service?.id}
              className={cn(
                "rounded-xl bg-white p-4 cursor-pointer transition hover:shadow-lg border",
                isSelected && "border-blue-500 ring-2 ring-blue-300"
              )}
              onClick={() => setSelectedServiceId(service.id)}
            >
              <div className="w-full h-48 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src={service?.cover_image}
                  alt={service?.service_name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold mb-1">
                {service?.service_name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {service?.description}
              </p>
              <p className="text-blue-600 font-semibold">
                قیمت: {service?.price.toLocaleString()} تومان
              </p>
            </div>
          );
        })}
      </div>

      {selectedServiceData && !isServiceLoading && (
        <div className="mt-6">
          <CustomeDateRangePicker
            onRangeSelect={rangeHandler}
            reserveData={{
              reserved_from,
              reserved_to,
            }}
          />
        </div>
      )}

      <div className="my-3">
        <Button
        onPress={handleConfirm}
          className="bg-[#3B82F6] text-white"
          isDisabled={!startDate || !endDate}
          variant="solid"
        >
       {isPatching ? <BtnLoader/>:"ادامه"}
        </Button>
      </div>
    </div>
  );
};

export default Stage1;
