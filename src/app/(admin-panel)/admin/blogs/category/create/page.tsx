"use client";

import { BtnLoader } from "@/components/element/Loader";
import CreateCategory from "@/components/template/adminPanel/blogs/category/createCategoryPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div>
          <BtnLoader />
        </div>
      }
    >
      <CreateCategory />
    </Suspense>
  );
};

export default page;
