import Services from "@/components/template/services/servicesPage";
import { getAllServiceCustomer } from "@/services/api/service";

async function ServicesPage() {
  const data = await getAllServiceCustomer();

  return <Services initialData={data} />;
}
export default ServicesPage;
