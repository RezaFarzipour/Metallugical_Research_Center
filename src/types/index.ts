import React, { SVGProps } from "react";
import { IconType } from "react-icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DashboardMinicardProps {
  color: string;
  shadow: string;
  label: string;
  count: number;
  icon: IconType;
}
export interface SidebarLink {
  id: number;
  title: string;
  to: string;
  hover?: string;
  icon: IconType;
}

//reza:
export type latestArticleType = {
  id: number,
  image: string,
  publishedDate: Date,
  author: string,
  articleTitle: string,
  description: string
}


export type contactInfoType = {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
};

