// "use client";
// import React from "react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useGetUser } from "@/hooks/useAuth";
// import Stage2 from "@/components/template/reservation/Stage2";
// import Stage3 from "@/components/template/reservation/Stage3";
// import { ServiceDetailsType } from "@/types";
// import http from "@/services/httpService";
// import Stage4 from "@/components/template/reservation/Stage4";
// import { showToast } from "@/store/useToastSlice";
// import BtnLoader from "@/components/element/BtnLoader";
// import { getReserveCustomerById } from "@/services/api/reserve";
// import Stage5 from "@/components/template/reservation/Stage5";
// import Stage6 from "@/components/template/reservation/Stage6";
// import Stepper from "@/components/module/Stepper";
// import { useStepperStore } from "@/store/useSteperSlice";
// import { reserveStep } from "@/constants/data";
// import { useReservationStore } from "@/store/useReservationStore";

// const Reservation = () => {
//   const searchParams = useSearchParams();
//   const reserveId = searchParams.get("reserve-id");
//   const { currentStep } = useStepperStore();
//   const { setCurrentStep } = useStepperStore();
//   const [stage, setStage] = useState<number | null>(null);
//   const { isPendingApproval, setPendingApproval } = useReservationStore();

//   useEffect(() => {
//     if (!reserveId) return;
//   }, [reserveId]);

//   //find out that user is admin or customer
//   const { role } = useGetUser().data || {};

//   //find out which stage we are in!
//   const { data, error, isPending } = useQuery({
//     queryKey: ["get-stage", reserveId],
//     queryFn: ({ queryKey }) => getReserveCustomerById(queryKey[1]),
//   });

//   //get service details
//   const { data: serviceData, isLoading: isServiceLoading } =
//     useQuery<ServiceDetailsType>({
//       queryKey: ["get-device-details", data?.service],
//       queryFn: () => http.get(`/service/s/customer/${data?.service}/`),
//       staleTime: 1000 * 60 * 5,
//       refetchOnWindowFocus: false,
//     });

//   useEffect(() => {
//     if (data?.stage) {
//       setStage(data.stage);
//       setCurrentStep(data.stage);
//     }
//   }, [data]);

//   if (error) return showToast(error.message, "error");

//   if (isPending) return <BtnLoader />;

//   return (
//     <div className="p-6">
//       <div className="mb-4">
//         {" "}
//         <Stepper currentStep={currentStep} steperDetails={reserveStep} />
//       </div>

//       {stage === 1 && <div>stage1</div>}

//       {stage === 2 && (
//         <div>
//           <Stage2
//             setStage={setStage}
//             role={role}
//             data={data}
//             reserveId={reserveId}
//             servicedata={serviceData}
//             isServiceLoading={isServiceLoading}
//           />
//         </div>
//       )}
//       {stage === 3 && (
//         <Stage3
//           reserveId={reserveId}
//           role={role}
//           data={data}
//           setStage={setStage}
//           serviceData={serviceData}
//         />
//       )}

//       {stage === 4 && (
//         <Stage4
//           data={data}
//           setStage={setStage}
//           role={role}
//           serviceData={serviceData}
//           reserveId={reserveId}
//         />
//       )}

//       {stage === 5 && (
//         <Stage5
//           role={role}
//           serviceData={serviceData}
//           data={data}
//           reserveId={reserveId}
//         />
//       )}

//       {stage === 6 && <Stage6 data={data} serviceData={serviceData} />}
//     </div>
//   );
// };

// export default Reservation;
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

const Reservation = () => {
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
  console.log(data, "data");

  // Fetch service details
  const { data: serviceData, isLoading: isServiceLoading } = useQuery({
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
    { step: 1, component: <div>stage1</div> },
    {
      step: 2,
      component: <CustomerWaitingStage reserveId={reserveId} />,
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
      component: <CustomerWaitingStage reserveId={reserveId} />,
    },
    { step: 5, component: <FinalStep data={data} serviceData={serviceData} /> },
  ];

  const stepsToShow = role === "admin" ? adminSteps : customerSteps;
  const steperDetails = reserveStep[role === "admin" ? "admin" : "customer"];
  const getStepIndexFromStage = (stage: number) => {
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
      if (stage >= 5) return 5;
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

export default Reservation;
