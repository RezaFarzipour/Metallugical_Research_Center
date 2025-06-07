import { AxiosRequestConfig } from "axios";
import http from "../httpService";

export const getAllServiceAdmin = async (options?: AxiosRequestConfig) => {
  const response = await http.get(`service/s/admin/`, options);
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

export const createNewService = async (data: FormData) => {
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

export const createServiceImages = async (data:FormData) => {
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
export const createServiceDateRange = async ({data}:{
  data: {
    reserved_from: string;
    reserved_to: string;
    service: string;
  };
}) => {
  console.log("dataaaaa",data)
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
export const getAllServiceCustomer = async (options?: AxiosRequestConfig) => {
  const response = await http.get(`service/s/customer/`, options);
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
