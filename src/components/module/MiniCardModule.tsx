"use client";
import Minicard from "@/components/element/Minicard";
import { DashboardMinicardProps } from "@/types";
import React from "react";

interface MiniCardModuleProps {
  cards: DashboardMinicardProps[];
}

const MiniCardModule: React.FC<MiniCardModuleProps> = ({ cards }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {cards.map((card, index) => (
        <Minicard key={index} {...card} />
      ))}
    </div>
  );
};

export default MiniCardModule;
