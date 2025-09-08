import LandingPage from "@/components/template/landingPage";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import createServerApolloClient from "@/lib/apollo-server-client";
import { getAllServiceCustomer } from "@/services/api/service";
import React from "react";

export const revalidate = 0; // همیشه آخرین دیتا

const Landing = async () => {
  const client = createServerApolloClient();
  const data = await getAllServiceCustomer();

  const { data: AllBlogs } = await client.query({
    query: GET_ALL_BLOGS,
    fetchPolicy: "no-cache",
  });
  const services = data.filter((service: any) => !service.is_package);

  return (
    <div>
      <LandingPage initialData={services} AllBlogs={AllBlogs.blogs} />
    </div>
  );
};

export default Landing;
