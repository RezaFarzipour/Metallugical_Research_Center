import ServiceDetailsPage from "@/components/template/adminPanel/adminServices/serviceDetailsPage";
import { getServicesByIdAdmin } from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

export default async function Details({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdAdmin(serviceId, options);

  return <ServiceDetailsPage dataByID={serviceData} />;
}
