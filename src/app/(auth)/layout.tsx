"use client";
import BgAnimateShape from "@/components/element/animations/BgAnimateShape";
import Stepper from "@/components/module/Stepper";
import { Authsteps } from "@/constants/data";
import { useStepperStore } from "@/store/useSteperSlice";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { currentStep } = useStepperStore();
  return (
    <div className="flex items-center justify-center h-screen bg-secondary-50">
      <div className="relative flex flex-col lg:flex-row w-full h-full overflow-hidden">
        <BgAnimateShape animation="animate-blink hidden lg:block" />
        <div className="absolute top-[16rem] right-[16rem] hidden lg:block">
          <BgAnimateShape animation="animate-blink" />
        </div>

        {/* باکس فرم */}
        <div className="bg-transparent  flex  lg:block items-center justify-center min-h-screen lg:min-h-fit lg:absolute lg:top-28 lg:right-48 z-10 w-full p-4">
          <div className="bg-white/30 backdrop-sepia-0 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold py-4 text-center text-gray-800">
              آزمایشگاه
            </h2>
            <div>{children}</div>
          </div>
        </div>

        {/* باکس تصویر و استپر - فقط در دسکتاپ (lg و بالاتر) */}
        <div className="hidden lg:block w-3/5 bg-blue-500 h-full absolute top-0 left-0">
          <Image
            src="/images/unipix-2.jpg"
            alt="logo"
            fill
            className="brightness-[75%]"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2">
            <Stepper currentStep={currentStep} steperDetails={Authsteps} />
          </div>
        </div>
      </div>
    </div>
  );
}
