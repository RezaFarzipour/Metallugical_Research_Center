"use client";
import { BtnLoader } from "@/components/element/Loader";
import UsersPage from "@/components/template/adminPanel/users/usersPage";
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
      <UsersPage />
    </Suspense>
  );
};

export default page;
