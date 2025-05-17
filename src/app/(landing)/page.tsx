import LandingPage from "@/components/template/landingPage";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import createServerApolloClient from "@/lib/apollo-server-client";
import { getAllServiceCustomer } from "@/services/api/service";

import React from "react";

const Landing = async () => {
  const client = createServerApolloClient();
  const data = await getAllServiceCustomer();

  //getting data server-side with react-query
  const { data :AllBlogs} = await client.query({
    query: GET_ALL_BLOGS,
    fetchPolicy: "no-cache", //دیتارو cache نمیکنه و همیشه اخرین دیتارو میده
  });


  console.log("AllBlogs",AllBlogs)
  return (
    <div>
      <LandingPage initialData={data} AllBlogs={AllBlogs.blogs}/>
    </div>
  );
};

export default Landing;
