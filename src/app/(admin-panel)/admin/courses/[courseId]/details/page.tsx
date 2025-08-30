import CourseDetailsPage from "@/components/template/adminPanel/courses/courceDetailsPage";
import { getServicesByIdAdmin } from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

export default async function Details({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdAdmin(courseId, options);


  return <CourseDetailsPage dataByID={serviceData} />;
}
