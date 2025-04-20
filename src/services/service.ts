import http from "./httpService";

export const getAllProductAdmin = async () => {

    const response = await http.get(`service/s/admin/`);
    return response.data;
};

export const getProductrByIdAdmin = async ({
    id,
}: {
    id: string;

}) => {
    const response = await http.patch(`service/s/admin/${id}/`);
    return response.data;
};
