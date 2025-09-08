import EditServicePage from "@/components/template/adminPanel/adminServices/editServicePage";
import {
  getAllServiceImages,
  getServicesByIdAdmin,
} from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { toEnglishNumbers } from "@/utils/formatter/toPersianNumbers";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const serviceIds = decodeURIComponent(serviceId);
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdAdmin(serviceId, options);
  const serviceAllImageData = await getAllServiceImages(options);

  const filteredServiceImages = serviceAllImageData.filter(
    (image: any) =>
      String(image.service) === String(toEnglishNumbers(serviceIds))
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
