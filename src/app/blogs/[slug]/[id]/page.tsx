"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();

   const blogId = params.id;



  return (
    <div className="bg-red-500">

      <h1>Blog ID: {blogId}</h1> 

      bloogggggg id
    </div>
  );
};

export default Page;
