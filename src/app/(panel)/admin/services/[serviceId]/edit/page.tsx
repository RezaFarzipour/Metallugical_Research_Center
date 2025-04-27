import EditServicePage from "@/components/template/adminPanel/AdminServices/editServicePage";
import { getServicesByIdAdmin } from "@/services/service";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";

type PageProps = {
  params: { serviceId: string };
};

const Page = async ({ params }: PageProps) => {
  const serviceId = params.serviceId;

  

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const data = await getServicesByIdAdmin(serviceId, options);


  return (
    <div>
      <EditServicePage serviceDataEdit={data} />
    </div>
  );
};

export default Page;
