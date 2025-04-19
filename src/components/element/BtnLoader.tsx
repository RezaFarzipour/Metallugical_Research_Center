"use client";
import { ThreeDots } from "react-loader-spinner";

interface BtnLoaderProps {
  width?: string;
  height?: string;
  color?: string;
}

function BtnLoader({ width = "60", height = "40", color = "#fff" }: BtnLoaderProps) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius="9"
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
}
export default BtnLoader;
