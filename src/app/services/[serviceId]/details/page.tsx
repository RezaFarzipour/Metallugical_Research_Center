import ServiceDetails from "@/components/template/services/serviceDetailsPage";
import { getServicesByIdCustomer } from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import React from "react";

type PageProps = {
  params: { serviceId: string };
};
export default async function Details({ params }: PageProps) {
  const { serviceId } = params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdCustomer(serviceId, options);

  return <ServiceDetails serviceData={serviceData} />;
}
