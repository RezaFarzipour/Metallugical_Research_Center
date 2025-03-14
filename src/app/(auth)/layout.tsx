import BgAnimateShape from "@/components/element/BgAnimateShape";
import Stepper from "@/components/module/Stepper";
import Image from "next/image";

export const metadata = {
  title: "Auth",
  description: "Auth",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary-50">
      <div className="flex w-full h-full relative overflow-hidden">
        <BgAnimateShape animation="animate-blink " />
        <div className="absolute top-[16rem] right-[16rem] ">
          <BgAnimateShape animation="animate-blink " />
        </div>
        {/* باکس سمت راست */}
        <div className="p-4 w-1/3 bg-transparent absolute top-28 right-48 z-10">
          <div className="bg-white/30 backdrop-sepia-0 rounded-lg shadow-lg p-4">
            <h2 className="text-4xl font-bold py-8 text-center text-gray-800">
              آزمایشگاه
            </h2>

            {children}
          </div>
        </div>

        {/* باکس سمت چپ */}
        <div className="p-2 w-3/5 bg-blue-500 h-full absolute top-0 left-0">
          <Image
            src="/images/uni-pix.jpg"
            alt="logo"
            fill
            className="brightness-[75%] "
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2">
            <Stepper currentStep={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
