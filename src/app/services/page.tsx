import { BtnLoader } from "@/components/element/Loader";
import Services from "@/components/template/services/servicesPage";
import { getAllServiceCustomer } from "@/services/api/service";
import { Suspense } from "react";

async function ServicesPage() {
  const data = await getAllServiceCustomer();

  const services = data.filter((service: any) => !service.is_package);

  return (
    <Suspense
      fallback={
        <div>
          <BtnLoader />
        </div>
      }
    >
      <Services initialData={services} />;{" "}
    </Suspense>
  );
}
export default ServicesPage;
