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

export type sidebarchildren ={
 id:number,title:string,to:string
}
// export interface SidebarLink {
//   id: number;
//   title: string;
//   to: string;
//   hover?: string;
//   icon: IconType;
//   children?:sidebarchildren[]
// }

export type NavLinkItem = {
  id: number;
  title: string;
  to: string;
  icon: React.ElementType; // یا React.ComponentType برای آیکن
  children?:sidebarchildren[]
};


//reza:


export type contactInfoType = {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
};



export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}


export interface FormInputConfig {
  id: number;
  label: string;
  name: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  boleean?: boolean;
  options?: { label: string, value: boolean }[]
}


export interface User {
  email: string;
  first_name: string;
  is_signup: boolean;
  last_name: string;
  phone_number: string;
  role: string;
  username: string;
}

export interface UserProfileResponse {
  response: {
    data: User[]; // آرایه از User
   
  };
}

export interface serviceDataEditType {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
}


export type AllUsersType = {
  username:string;
  first_name: string;
  last_name: string;
  email: string;
  is_signup: boolean;
  phone_number: string;
  role: "customer" | "admin";
}