import EditServicePage from "@/components/template/adminPanel/adminServices/editServicePage";
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
  const serviceAllImageData = await getAllServiceImages(options);

  const filteredServiceImages = serviceAllImageData.filter(
    (image) => String(image.service) === String(toEnglishNumbers(serviceIds))
  );

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
