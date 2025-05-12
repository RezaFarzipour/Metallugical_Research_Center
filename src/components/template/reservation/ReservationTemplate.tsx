"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "@/hooks/useAuth";
import Stepper from "@/components/module/Stepper";
import { useStepperStore } from "@/store/useSteperSlice";
import { reserveStep } from "@/constants/data";
import { showToast } from "@/store/useToastSlice";
import { getReserveCustomerById } from "@/services/api/reserve";
import AdminStage1 from "@/components/template/reservation/reserveAction/AdminStage1";
import AdminStage3 from "@/components/template/reservation/reserveAction/AdminStage3";
import AdminStage4 from "@/components/template/reservation/reserveAction/AdminStage4";
import CustomerStage3 from "@/components/template/reservation/reserveAction/CustomerStage3";
import http from "@/services/httpService";
import Stage1 from "./reserveAction/CustomerStage1";
import { getAllServiceCustomer } from "@/services/api/service";
import { BtnLoader } from "@/components/element/Loader";
import WaitingStage from "@/components/template/reservation/reserveAction/WaitingStage";
import AdminStage2 from "./reserveAction/AdminStage2";
import FinalStage from "@/components/template/reservation/reserveAction/FinalStage";
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
  const {
    data: reservationData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["get-stage", reserveId],
    queryFn: ({ queryKey }) => getReserveCustomerById(queryKey[1]),
  });

  // Fetch service details
  const { data: serviceData, isLoading: isServiceLoading } = useQuery({
    queryKey: ["get-device-details", reservationData?.service],
    queryFn: () => http.get(`/service/s/customer/${reservationData?.service}/`),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  //get all services

  const { data: allServices, isPending: isAllServicesPending } = useQuery({
    queryKey: ["getAll-servicesCustomer"],
    queryFn: getAllServiceCustomer,
  });

  useEffect(() => {
    if (reservationData?.stage) {
      setStage(reservationData.stage);
      setCurrentStep(reservationData.stage);
    }
  }, [reservationData]);

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
          reservationData={reservationData}
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
          reservationData={reservationData}
          serviceData={serviceData}
          typographyContent={{
            main: "در انتظار ارسال فیش واریز توسط مشتری",
          }}
        />
      ),
    },
    {
      step: 3,
      component: (
        <AdminStage3
          reservationData={reservationData}
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
          reservationData={reservationData}
          reserveId={reserveId}
        />
      ),
    },
    {
      step: 5,
      component: (
        <FinalStage
          reservationData={reservationData}
          serviceData={serviceData}
        />
      ),
    },
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
        <WaitingStage
          reservationData={reservationData}
          serviceData={serviceData}
          reserveId={reserveId}
          typographyContent={{
            main: "درخواست شما در حال بررسی توسط ادمین است",
            span: "فرآیند تأیید از طریق پیامک انجام می‌شود",
          }}
        />
      ),
    },
    {
      step: 3,
      component: (
        <CustomerStage3
          reserveId={reserveId}
          reservationData={reservationData}
          serviceData={serviceData}
        />
      ),
    },
    {
      step: 4,
      component: (
        <WaitingStage
          reserveId={reserveId}
          reservationData={reservationData}
          serviceData={serviceData}
          typographyContent={{
            main: "درخواست شما در حال بررسی توسط ادمین است",
            span: "فرآیند تأیید از طریق پیامک انجام می‌شود",
          }}
        />
      ),
    },
    {
      step: 5,
      component: (
        <WaitingStage
          reserveId={reserveId}
          reservationData={reservationData}
          serviceData={serviceData}
          typographyContent={{
            main: "درخواست شما در حال بررسی توسط ادمین است",
            span: "فرآیند تأیید از طریق پیامک انجام می‌شود",
          }}
        />
      ),
    },

    {
      step: 6,
      component: (
        <FinalStage
          reservationData={reservationData}
          serviceData={serviceData}
        />
      ),
    },
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
      <div className="mb-4 ">
        <Stepper currentStep={activeStep} steperDetails={steperDetails} />
      </div>

      {stepsToShow.map((step) =>
        step.step === activeStep ? (
          <div
            key={step.step}
            className="w-full container rounded-xl h-auto bg-white p-4 shadow-lg shadow-secondary-50"
          >
            {step.component}
          </div>
        ) : null
      )}
    </div>
  );
};

export default ReservationTemplate;
