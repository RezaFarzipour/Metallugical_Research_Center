import EditcoursePage from "@/components/template/adminPanel/courses/editCourcePage";
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
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const serviceId = decodeURIComponent(courseId);
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdAdmin(courseId, options);
  const serviceAllImageData = await getAllServiceImages(options);

  const filteredServiceImages = serviceAllImageData.filter(
    (image: any) =>
      String(image.service) === String(toEnglishNumbers(serviceId))
  );

  if (!serviceData) {
    notFound();
  }
  console.log("filteredServiceImages",filteredServiceImages)
  return (
    <div>
      <EditcoursePage
      serviceId={serviceId}
        serviceDataEdit={serviceData}
        filteredServiceImages={filteredServiceImages}
      />
    </div>
  );
}
