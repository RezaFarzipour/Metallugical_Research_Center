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


export const deleteServiceById = async ({
    id,
}: {
    id: string;
}) => {
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
    console.log("idid", id);

    const response = await http.patch(`service/images/admin/${id}/`, data);
    return response.data;
};

export const deleteServiceImageById = async ({
    id,
}: {
    id: string;
}) => {
    const response = await http.delete(`service/images/admin/${id}/`);
    return response.data;
};
