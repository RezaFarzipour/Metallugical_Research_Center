"use client";
import { Hourglass, ThreeDots } from "react-loader-spinner";

interface LoaderProps {
  width?: string;
  height?: string;
  color?: string;
}

export function PageLoader({
  width = "60",
  height = "40",
  color = "#fff",
}: LoaderProps) {
  return (
    <Hourglass
      height={height}
      width={width}
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      color={color}
      visible={true}
    />
  );
}

export function BtnLoader({
  width = "60",
  height = "40",
  color = "#fff",
}: LoaderProps) {
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
