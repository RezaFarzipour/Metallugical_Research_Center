import ServiceDetails from "@/components/template/services/serviceDetailsPage";
import { getServicesByIdCustomer } from "@/services/api/service";
import setCookiesOnReq from "@/utils/auth/setCookieOnReq";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import React from "react";



export async function generateMetadata({
  params,
}: {params:Promise<{serviceId:string}>}): Promise<Metadata> {
  const { serviceId } = await params;
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const serviceData = await getServicesByIdCustomer(serviceId, options);

  return {
    title: serviceData?.service_name || "جزئیات خدمات",
    description: serviceData?.description || "توضیحات مربوط به این خدمت",
  };
}

export default async function Details({ params }: {params:Promise<{serviceId:string}>}) {
  const { serviceId } = await params;

  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);

  const serviceData = await getServicesByIdCustomer(serviceId, options);
  return <ServiceDetails serviceData={serviceData} />;
}
