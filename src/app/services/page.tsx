import Services from "@/components/template/services/servicesPage";
import { getAllServiceCustomer } from "@/services/api/service";

export const metadata = {
  //   title: "Contact",
  title: {
    absolute: "Services", // ignore %s in parent layout.
  },
};

async function ServicesPage() {
  const data = await getAllServiceCustomer();

  return <Services initialData={data} />;
}
export default ServicesPage;
