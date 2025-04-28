import EditServicePage from "@/components/template/adminPanel/AdminServices/editServicePage";
import {
  getAllServiceImages,
  getServicesByIdAdmin,
} from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { toEnglishNumbers } from "@/utils/formatter/toPersianNumbers";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: { serviceId: string };
};

export default async function Page({ params }: PageProps) {
  const { serviceId } = params;
  const serviceIds = decodeURIComponent(serviceId);
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdAdmin(serviceId, options);

  // const serviceImageData = await getServicesImageById(serviceId, options);
  const serviceAllImageData = await getAllServiceImages(options);

  // console.log("serviceImageData", serviceImageData);
  console.log("serviceAllImageData", serviceAllImageData);
  // console.log("serviceId", toEnglishNumbers(serviceIds));
  const filteredServiceImages = serviceAllImageData.filter(
    (image) => String(image.service) === String(toEnglishNumbers(serviceIds))
  );

  console.log("filteredServiceImages", filteredServiceImages);
  if (!serviceData) {
    notFound();
  }

  return (
    <div>
      <EditServicePage
        serviceDataEdit={serviceData}
        filteredServiceImages={filteredServiceImages}
      />
    </div>
  );
}
