import Minicard from "@/components/element/Minicard";
import React from "react";
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ReactElement } from "react";
import { CiClock1 } from "react-icons/ci";

interface MinicardProps {
  color: string;
  shadow: string;
  icon: ReactElement;
  label: string;
  count: number;
}

const MiniCardModule: React.FC = () => {
  const cards: MinicardProps[] = [
    {
      color: "bg-primary-900",
      shadow:
        "shadow-[rgba(24,45,60,0.2)_-13px_0px,_rgba(24,45,60,0.1)_-23px_0px]",
      icon: <CiClock1 />,
      label: "تاریخ پیوستن",
      count: 10,
    },
    {
      color: "bg-secondary-500",
      shadow:
        "shadow-[rgba(55,124,251,0.2)_-13px_0px,_rgba(55,124,251,0.1)_-23px_0px]",
      icon: <PiDeviceTabletSpeakerLight />,
      label: "سفارش ها",
      count: 10,
    },

    {
      color: "bg-green-500",
      shadow:
        "shadow-[rgba(34,197,94,0.2)_-13px_0px,_rgba(34,197,94,0.1)_-23px_0px]",
      icon: <IoDocumentTextOutline />,
      label: "همه سفارش ها",
      count: 10,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {cards.map((card, index) => (
        <Minicard key={index} {...card} />
      ))}
    </div>
  );
};

export default MiniCardModule;
