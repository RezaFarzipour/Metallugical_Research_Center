"use client";

import { Button } from "@heroui/button";

function Error({ error, reset }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="container xl:max-w-screen-xl ">
      <div className="flex justify-center pt-10">
        <div>
          <p className="text-xl font-bold text-red-500 mb-8">
            {isDev
              ? error.message
              : "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."}
          </p>
          <Button
            onPress={reset}
            className="flex items-center gap-x-2 text-secondary-500"
          >
            تلاش مجدد
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Error;
