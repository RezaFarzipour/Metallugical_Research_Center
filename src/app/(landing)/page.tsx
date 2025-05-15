import LandingPage from "@/components/template/landingPage";
import { getAllServiceCustomer } from "@/services/api/service";
import React from "react";

const Landing = async () => {
  const data = await getAllServiceCustomer();

  return (
    <div>
      <LandingPage initialData={data} />
    </div>
  );
};

export default Landing;
