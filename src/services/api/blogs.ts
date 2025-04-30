import http from "../httpService";

export const getAllBlogsAdmin = async () => {

    const response = await http.get(`blog/b/any/`);
    return response.data;
};


