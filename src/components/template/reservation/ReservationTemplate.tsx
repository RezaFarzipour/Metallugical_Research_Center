"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "@/hooks/useAuth";
import Stepper from "@/components/module/Stepper";
import { useStepperStore } from "@/store/useSteperSlice";
import { reserveStep } from "@/constants/data";
import BtnLoader from "@/components/element/BtnLoader";
import { showToast } from "@/store/useToastSlice";
import { getReserveCustomerById } from "@/services/api/reserve";
import AdminStage1 from "@/components/template/reservation/reserveAction/AdminStage1";
import AdminStage2 from "@/components/template/reservation/reserveAction/AdminStage2";
import AdminStage3 from "@/components/template/reservation/reserveAction/AdminStage3";
import AdminStage4 from "@/components/template/reservation/reserveAction/AdminStage4";
import FinalStep from "@/components/template/reservation/reserveAction/FinalStep";
import CustomerStage3 from "@/components/template/reservation/reserveAction/CustomerStage3";
import http from "@/services/httpService";
import CustomerWaitingStage from "@/components/template/reservation/reserveAction/CustomerWaitingStage";
import Stage1 from "./reserveAction/CustomerStage1";
import { getAllServiceCustomer } from "@/services/api/service";
const ReservationTemplate = () => {
  const searchParams = useSearchParams();
  const reserveId = searchParams.get("reserve-id");
  const { setCurrentStep } = useStepperStore();
  const [stage, setStage] = useState<number | null>(null);

  useEffect(() => {
    if (!reserveId) return;
  }, [reserveId]);

  // Role detection
  const { role } = useGetUser().data || {};

  // Fetch data for the current reservation
  const { data, error, isPending } = useQuery({
    queryKey: ["get-stage", reserveId],
    queryFn: ({ queryKey }) => getReserveCustomerById(queryKey[1]),
  });

  // Fetch service details
  const { data: serviceData, isLoading: isServiceLoading } = useQuery({
    queryKey: ["get-device-details", data?.service],
    queryFn: () => http.get(`/service/s/customer/${data?.service}/`),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  //get all services

  const { data: allServices, isPending: isAllServicesPending } = useQuery({
    queryKey: ["getAll-servicesCustomer"],
    queryFn: getAllServiceCustomer,
  });

  useEffect(() => {
    if (data?.stage) {
      setStage(data.stage);
      setCurrentStep(data.stage);
    }
  }, [data]);

  if (error) {
    showToast("خطا در دریافت اطلاعات", "error");
    return null;
  }

  if (isPending) return <BtnLoader />;
  console.log("stage", stage);

  // Define separate steps for Admin and Customer
  const adminSteps = [
    {
      step: 1,
      component: (
        <AdminStage1
          data={data}
          reserveId={reserveId}
          servicedata={serviceData}
          isServiceLoading={isServiceLoading}
        />
      ),
    },
    {
      step: 2,
      component: (
        <AdminStage2
          reserveId={reserveId}
          data={data}
          serviceData={serviceData}
        />
      ),
    },
    {
      step: 3,
      component: (
        <AdminStage3
          data={data}
          serviceData={serviceData}
          reserveId={reserveId}
        />
      ),
    },
    {
      step: 4,
      component: (
        <AdminStage4
          serviceData={serviceData}
          data={data}
          reserveId={reserveId}
        />
      ),
    },
    { step: 5, component: <FinalStep data={data} serviceData={serviceData} /> },
  ];

  const customerSteps = [
    {
      step: 1,
      component: (
        <Stage1
          allServices={allServices}
          isAllServicesPending={isAllServicesPending}
        />
      ),
    },
    {
      step: 2,
      component: (
        <CustomerWaitingStage
          data={data}
          serviceData={serviceData}
          reserveId={reserveId}
        />
      ),
    },
    {
      step: 3,
      component: (
        <CustomerStage3
          reserveId={reserveId}
          data={data}
          serviceData={serviceData}
        />
      ),
    },
    {
      step: 4,
      component: (
        <CustomerWaitingStage
          reserveId={reserveId}
          data={data}
          serviceData={serviceData}
        />
      ),
    },
    {
      step: 5,
      component: (
        <CustomerWaitingStage
          reserveId={reserveId}
          data={data}
          serviceData={serviceData}
        />
      ),
    },
    { step: 6, component: <FinalStep data={data} serviceData={serviceData} /> },
  ];

  const stepsToShow = role === "admin" ? adminSteps : customerSteps;
  const steperDetails = reserveStep[role === "admin" ? "admin" : "customer"];
  const getStepIndexFromStage = (stage: number | null) => {
    if (stage === null) return 1;

    if (role === "admin") {
      if (stage <= 2) return 1;
      if (stage === 3) return 2;
      if (stage === 4) return 3;
      if (stage === 5) return 4;
      if (stage >= 6) return 5;
    } else {
      if (stage <= 1) return 1;
      if (stage === 2) return 2;
      if (stage === 3) return 3;
      if (stage === 4) return 4;
      if (stage === 5) return 5;
      if (stage === 6) return 6;
    }
    return 1;
  };
  const activeStep = getStepIndexFromStage(stage);

  return (
    <div className="p-6">
      <div className="mb-4">
        <Stepper currentStep={activeStep} steperDetails={steperDetails} />
      </div>

      {stepsToShow.map((step) =>
        step.step === activeStep ? (
          <div key={step.step}>{step.component}</div>
        ) : null
      )}
    </div>
  );
};

export default ReservationTemplate;
