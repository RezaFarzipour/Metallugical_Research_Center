import { AxiosRequestConfig } from "axios";
import http from "./httpService";

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

export const createNewProduct = async (data) => {
    const response = await http.post(`service/s/admin/`, data);
    return response.data;
};


export const editNewProduct = async ({
    id,
    data,
}: {
    id: string;
    data: FormData;
}) => {
    const response = await http.patch(`service/s/admin/${id}/`, data);
    return response.data;
};


export const deleteNewProduct = async ({
    id,
}: {
    id: string;
}) => {
    const response = await http.delete(`service/s/admin/${id}/`);
    return response.data;
};