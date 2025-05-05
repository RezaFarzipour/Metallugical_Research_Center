import { AxiosRequestConfig } from "axios";
import http from "../httpService";

export const getAllServiceAdmin = async () => {
  const response = await http.get(`service/s/admin/`);
  return response.data;
};

export const getServicesByIdAdmin = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`service/s/admin/${id}/`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNewService = async (data) => {
  const response = await http.post(`service/s/admin/`, data);
  return response.data;
};

export const editServiceByID = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.patch(`service/s/admin/${id}/`, data);
  return response.data;
};

export const deleteServiceById = async ({ id }: { id: string }) => {
  const response = await http.delete(`service/s/admin/${id}/`);
  return response.data;
};

// API Images:
export const getAllServiceImages = async (options?: AxiosRequestConfig) => {
  const response = await http.get(`service/images/admin/`, options);
  return response.data;
};

export const getServicesImageById = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`service/images/admin/${id}/`, options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createServiceImages = async (data) => {
  const response = await http.post(`service/images/admin/`, data);
  return response.data;
};

export const editServiceImageByID = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.patch(`service/images/admin/${id}/`, data);
  return response.data;
};

export const deleteServiceImageById = async ({ id }: { id: string }) => {
  const response = await http.delete(`service/images/admin/${id}/`);
  return response.data;
};

// API DateRange:
export const createServiceDateRange = async (data) => {
  const response = await http.post(`service/reserve-date/admin/`, data);
  return response.data;
};
export const getServicesDateRangeById = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`service/reserve-date/admin/89/`, options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const editervicesDateRangeById = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.patch(`service/reserve-date/admin/${id}/`, data);
  return response.data;
};

export const getAllReserveDate = async () => {
  try {
    const response = await http.get(`service/reserve-date/admin/`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllServiceCustomer = async () => {
  const response = await http.get(`service/s/customer/`);
  return response.data;
};

export const getServicesByIdCustomer = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`service/s/customer/${id}/`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postReservedService = async () => {
  const response = await http.post(`/reserve`);
  return response.data;
};

// stage1

export async function patchReserveDetails({
  reserveId,
  reserve_from,
  reserve_to,
  service,
}: {
  reserve_from: string | null;
  reserve_to: string | null;
  service: string | null;
  reserveId: string | null;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      reserve_from,
      reserve_to,
      service,
    }
  );

  return response.data;
}

//stage2

export async function patchAcceptStage2({
  reserveId,
  is_reservation_time_verified,
  admin_description,
  reserve_duration,
  total_price,
}: {
  reserve_duration: number;
  is_reservation_time_verified: boolean;
  admin_description: string;
  reserveId: string | null;
  total_price: number;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      is_reservation_time_verified,
      admin_description,
      reserve_duration,
      total_price,
    }
  );

  return response.data;
}

export const getAllReserveCustomer = async (reserveId: string | null) => {
  const response = await http.get(`/reserve?reserve-id=${reserveId}`);
  return response.data;
};

export async function PatchRejectStage2({
  reserveId,
  admin_description,
  service
}: {
  admin_description: string;
  reserveId: string | null;
  service:string | undefined
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=0`,
    {
      admin_description,
      service
    }
  );

  return response.data;
}




export async function sendReceipt({
  reserveId,
 data
}: {
  reserveId: string | null;
  data: FormData;
}): Promise<any> {
  
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    
      data
    
  );

  return response.data;
}