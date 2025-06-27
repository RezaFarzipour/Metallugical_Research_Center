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
  reserveLength?: number
}

export type sidebarchildren = {
  id: number;
  title: string;
  to: string;
};

export type NavLinkItem = {
  id: number;
  title: string;
  to: string;
  icon: React.ElementType; // یا React.ComponentType برای آیکن
  children?: sidebarchildren[];
};

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
  options?: { label: string; value: boolean }[];
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


export type AllUsersType = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_signup: boolean;
  phone_number: string;
  role: "customer" | "admin";
};

export type UserType = {
  id: string | number;
  name?: string;
  email?: string;
  phone_number?: string;
  is_signup?: boolean;
  actions?: string;
};

export type reservationDataType = {
  is_reservation_time_verified: boolean;
  admin_description: string;
  reserve_duration: number;
  total_price: number;
  reserve_from?: string;
  stage: number;
  reserve_to?: string;
  service?: string;
  payment_image: string;
  user: string;
};


//reserve:
export interface Reserve {
  id: string;
  stage: number;
  is_canceled: boolean;
  user: string;
  reserve_from: string;
  reserve_to: string;
  service: string;
  is_reservation_time_verified: boolean;
  admin_description: string;
  reserve_duration: number;
  total_price: number;
  payment_image: string;
  is_payment_verified: boolean;
  is_finished: boolean;
}


//blog details type
interface BlogContent {
  id: string;
  index: number;
  class_name: string;
  content: string;
  is_multiline?: boolean;
}

interface BlogImage {
  id: string;
  image: string;
  blog: string;
}

export interface BlogData {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  tags: string[];
  category_list: string[];
  "blog-content": BlogContent[];
  "blog-image": BlogImage[];
}
export interface EditorItem {
  id: string;
  type: string;
  content: string;
}

export type BlogType = {
  id: string | number;
  name?: string;
  title?: string;
  image?: string;
  coverImage?: string;
  slug?: string; // اختیاری برای رفع خطا
  tags?: string[];
  actions?: string;
};

export interface blogDatafromServer {
  blogs: [];
  category_name: string;
  id: string;
  slug: string;
}


export interface BlogCategoryInput {
  category_name: string;
  slug: string;
}


export interface BlogContentInput {
  content: string;
  blog: string;
  index: number;
  class_name: string;
  is_multiline: boolean;
}

export type Category = {
  blogs: any[]; // یا BlogType[] اگر تایپ دقیق بلاگ‌ها رو داری
  category_name: string;
  id: string;
  slug: string;
};
//ExpiredReserve:
export interface ExpiredReserveItem {
  id: number;
  serviceId: number;
  service_id: number;
  serviceName: string;
  service_name: string;
  coverImage: string;
  cover_image: string;
  price: number;
  description: string;
}
// export interface ExpiredReserve {
//   id: number;
//   service_id: number;
//   service_name: string;
//   cover_image: string;
//   price: number;
//   description: string;

// }
// تایپ برای استور Zustand
export interface ExpiredReserveStore {
  expiredReserveDates: ExpiredReserveItem[];
  setExpiredReserveDates: (data: ExpiredReserveItem[]) => void;
}

//customeTable
export interface TableBase {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  amount: string;
  date: string;
  title: string;
  description: string;
  admin_description: string;
  image: string;
  author: string;
  articleTitle: string;
  dateRange: string;
  payment_status?: string;
  tags: string[];
}


//Reports:
export interface ReportData {
  _id: string;
  id: string;
  name: string;
  phone_number?: string;
  service_name: string;
  price: string;
  reserve_duration: string;
  dateRange: string;
  admin_description: string;
  stage: string;
  status: string;
  payment_status: string;
  actions?: string;

}

export interface RawReserveData {
  id: string;
  user: string;
  service: string;
  reserve_from: string;
  reserve_to: string;
  reserve_duration: number;
  total_price: number;
  admin_description: string;
  stage: number;
  is_canceled: boolean;
  is_finished: boolean;
  is_payment_verified: boolean;
}
export interface ServiceData {
  id: string;
  service_name: string;
}
export interface CardsData {
  numberOfUsers: number;
  numberOfServices: number;
  numberOfReservations: number;
  numberOfBlogs: number;
}