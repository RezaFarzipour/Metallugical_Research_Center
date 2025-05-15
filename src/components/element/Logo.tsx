import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center ">
        <Image src="/images/icon.png" alt="logo" width={28} height={28} />
        <div className="flex flex-col gap-0 pr-1 pt-1 text-secondary-600">
          <p className="font-bold text-inherit leading-none text-lg tracking-wider">
            آزمایشگاه
          </p>
          <p className=" text-[9px] leading-3 pr-1">دانشگاه آزاد زنجان</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
