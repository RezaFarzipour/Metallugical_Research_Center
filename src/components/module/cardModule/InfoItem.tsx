import React from "react";

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <div className="flex gap-2">
    {icon}
    <h4>{text}</h4>
  </div>
);
