export type ServerServiceType = {
  _id: string;
  id: string;
  price: string;
  name: string;
  image?: string;
  actions: string;
  description: string;
  dateRange: string;
};

//Landing:
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

export type ServiceData = {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImageType[];
  "service-reserve_date": ServiceReserveDateType[];
};
export type ServiceDetailsType = {
  data: {
    id: number;
    service_name: string;
    description: string;
    price: number;
    cover_image: string;
    "service-images": ServiceImageType[];
    "service-reserve_date": ServiceReserveDateType[];
  }

};

export interface serviceDataEditType {
  id?: string;
  service_name?: string;
  description?: string;
  price?: number | string;
  cover_image?: string;
}
