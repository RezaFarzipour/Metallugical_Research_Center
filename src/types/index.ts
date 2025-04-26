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


export interface UserProfileResponse {

  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_signup: boolean;
  phone_number: string;
  role: "customer" | "admin";


}

export type NavLinkItem = {
  id: number;
  title: string;
  to: string;
  icon: React.ElementType; // یا React.ComponentType برای آیکن
};

export interface serviceDataEditType {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
}