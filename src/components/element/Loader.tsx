"use client";
import { ClipLoader, PulseLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
}

export function PageLoader({
  size = 60,
  color = "#4F46E5",
}: LoaderProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ClipLoader size={size} color={color} />
    </div>
  );
}

export function BtnLoader({
  size = 10,
  color = "#fff",
}: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <PulseLoader size={size} color={color} />
    </div>
  );
}
