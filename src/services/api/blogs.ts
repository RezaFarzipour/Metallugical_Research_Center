import { AxiosRequestConfig } from "axios";
import http from "../httpService";

export const getAllBlogsAdmin = async () => {

    const response = await http.get(`blog/b/any/`);
    return response.data;
};
export const getAllCategoryAdmin = async () => {

    const response = await http.get(`blog/category/admin/`);
    return response.data;
};
export const createNewBlogCategory = async (data) => {
    const response = await http.post(`blog/category/admin/`, data);
    return response.data;
};

export const deleteBlogCategory = async ({ id }: { id: string }) => {
    const response = await http.delete(`blog/category/admin/${id}/`);
    return response.data;
};

export const editBlogCategoryById = async ({
    id,
    data,
}: {
    id: string;
    data: FormData;
}) => {
    const response = await http.patch(`blog/category/admin/${id}/`, data);
    return response.data;
};

export const getBlogCategoryById = async (
    id: string,
    options?: AxiosRequestConfig
) => {
    try {
        const response = await http.get(`blog/category/admin/${id}/`, options);
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
};
