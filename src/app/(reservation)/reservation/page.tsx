"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "@/hooks/useAuth";
import Stage2 from "@/components/template/reservation/Stage2";
import Stage3 from "@/components/template/reservation/Stage3";
import { ServiceDetailsType } from "@/types";
import http from "@/services/httpService";
import Stage4 from "@/components/template/reservation/Stage4";
import { showToast } from "@/store/useToastSlice";
import BtnLoader from "@/components/element/BtnLoader";
import { getAllReserveCustomer } from "@/services/api/reserve";
import Stage5 from "@/components/template/reservation/Stage5";
import Stage6 from "@/components/template/reservation/Stage6";
import Stepper from "@/components/module/Stepper";
import { useStepperStore } from "@/store/useSteperSlice";
import { reserveStep } from "@/constants/data";


const Reservation = () => {
  const searchParams = useSearchParams();
  const reserveId = searchParams.get("reserve-id");
  const { currentStep } = useStepperStore();
  const { setCurrentStep } = useStepperStore()
  const [stage, setStage] = useState<number | null>(null);

  useEffect(() => {
    if (!reserveId) return;
  }, [reserveId]);

  //find out that user is admin or customer
  const { role } = useGetUser().data || {};

  //find out which stage we are in!
  const { data, error, isPending } = useQuery({
    queryKey: ["get-stage", reserveId],
    queryFn: ({ queryKey }) => getAllReserveCustomer(queryKey[1]),
  });

  //get service details
  const { data: serviceData, isLoading: isServiceLoading } =
    useQuery<ServiceDetailsType>({
      queryKey: ["get-device-details", data?.service],
      queryFn: () => http.get(`/service/s/customer/${data?.service}/`),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (data?.stage) {
      setStage(data.stage);
      setCurrentStep(data.stage);
    }
  }, [data]);

  if (error) return showToast(error.message, "error");

  if (isPending) return <BtnLoader />;

  return (
    <div className="p-6">
      <div className="mb-4">
        {" "}
        <Stepper currentStep={currentStep} steperDetails={reserveStep} />
      </div>

      {stage === 1 && <div>stage1</div>}

      {stage === 2 && (
        <div>
          <Stage2
            setStage={setStage}
            role={role}
            data={data}
            reserveId={reserveId}
            servicedata={serviceData}
            isServiceLoading={isServiceLoading}
          />
        </div>
      )}
      {stage === 3 && (
        <Stage3
          reserveId={reserveId}
          role={role}
          data={data}
          setStage={setStage}
          serviceData={serviceData}
        />
      )}

      {stage === 4 && (
        <Stage4
          data={data}
          setStage={setStage}
          role={role}
          serviceData={serviceData}
          reserveId={reserveId}
        />
      )}

      {stage === 5 && (
        <Stage5
          role={role}
          serviceData={serviceData}
          data={data}
          reserveId={reserveId}
        />
      )}

      {stage === 6 && <Stage6 data={data} serviceData={serviceData} />}
    </div>
  );
};

export default Reservation;
