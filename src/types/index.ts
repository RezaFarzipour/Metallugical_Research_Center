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

export type serviceDataEditType = {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
}[]

export type AllUsersType = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_signup: boolean;
  phone_number: string;
  role: "customer" | "admin";
};

// export type ServiceDetailsType = {
//   data: {
//     id: number;
//     service_name: string;
//     description: string;
//     price: number;
//     cover_image: string;
//     reserve_duration: number
//   };
// };

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

//services Type
export interface EditorItem {
  id: string;
  type: "text" | "image";
  content: string;
}

export type ServiceImageType = {
  id: number;
  image: string;
  service: number;
};

export type ServiceReserveDateType = {
  id: number;
  reserved_from: string; // می‌تونی بزاری Date اگه قراره تبدیل بشه
  reserved_to: string;
  service: number;
};

export type ServiceDetailsType = {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImageType[];
  "service-reserve_date": ServiceReserveDateType[];
};

export type BlogType = {
  coverImage: string;
  id: number;
  slug: string;
  tags: string[];
  title: string;
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
  tags: string[]; // مثل: ['["safe","stafe"]']
  category_list: string[]; // مثل: ['["68332b9691f173ce1584e0f9"]']
  "blog-content": BlogContent[];
  "blog-image": BlogImage[];
}


// تایپ برای تصاویر سرویس
interface ServiceImage {
  id: number;
  image: string;
  service: number;
}

// تایپ برای تاریخ‌های رزرو
interface ServiceReserveDate {
  id: number;
  reserved_from: string;
  reserved_to: string;
  service: number;
}

// تایپ برای سرویس
export interface Service {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  'service-images': ServiceImage[];
  'service-reserve_date': ServiceReserveDate[];
}

// تایپ برای آیتم‌های منقضی شده
export interface ExpiredReserve {
  id: number;
  service_id: number;
  service_name: string;
  cover_image: string;
  price: number;
  description: string;

}

// تایپ برای استور Zustand
export interface ExpiredReserveStore {
  expiredReserveDates: ExpiredReserve[];
  setExpiredReserveDates: (data: ExpiredReserve[]) => void;
}