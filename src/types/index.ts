import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type sidebarData = {
  id: number,
  title: string;
  icon: React.ElementType;
  hover?: string;
};

export type latestArticleType  = {
  id:number,
  image:string,
  publishedDate:Date,
  author:string,
  articleTitle:string,
  description:string
}


export type contactInfoType = {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
};
