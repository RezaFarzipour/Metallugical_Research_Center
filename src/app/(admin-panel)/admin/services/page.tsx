import { BtnLoader } from "@/components/element/Loader";
import { AdminServicesPage } from "@/components/template/adminPanel/adminServices/adminServicesPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div>
          <BtnLoader />
        </div>
      }
    >
      <AdminServicesPage />
    </Suspense>
  );
};

export default page;
