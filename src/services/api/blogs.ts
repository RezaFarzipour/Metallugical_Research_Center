import { AxiosRequestConfig } from "axios";
import http from "../httpService";

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
  category_name,
  slug,
}: {
  id: string;
  category_name: string;
  slug: string;
}) => {
  const response = await http.patch(`blog/category/admin/${id}/`, {
    category_name,
    slug,
  });

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

export const getAllBlogsAdmin = async (options) => {
  const response = await http.get(`blog/b/any/`, options);
  return response.data;
};

export const getBlogContentById = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`blog/content/admin/${id}/`, options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getBlogById = async (id: string, options?: AxiosRequestConfig) => {
  try {
    const response = await http.get(`blog/b/admin/${id}/`, options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getBlogByIdAny = async (
  id: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`blog/b/any/${id}/`, options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getBlogCover = async () => {
  const response = await http.get(`blog/b/admin/`);
  return response.data;
};

export const createNewBlog = async (data) => {
  const response = await http.post(`blog/b/admin/`, data);
  console.log(response.data);

  return response.data;
};

export const editBlogById = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.patch(`blog/b/admin/${id}/`, data);
  return response.data;
};

export const editBlogContentById = async ({
  id,
  data,
}: {
  id: string;
  data: {
    content: string;
    blog: string | number;
    index: number;
    class_name: string;
    is_multiline: boolean;
  };
}) => {
  const response = await http.patch(`blog/content/admin/${id}/`, data);
  return response.data;
};

export const deleteBlog = async ({ id }: { id: string }) => {
  const response = await http.delete(`blog/b/admin/${id}/`);
  return response.data;
};

export const createNewBlogContent = async (data) => {
  const response = await http.post(`blog/content/admin/`, data);
  return response.data;
};

export const createNewBlogImageContent = async (data) => {
  const response = await http.post(`blog/image/admin/`, data);
  return response.data;
};

export const getAllBlogsCategory = async () => {
  const response = await http.get("blog/c/any/");
  return response.data;
};

export const getBlogCategoryByIdCustomer = async (id: string | undefined) => {
  try {
    const response = await http.get(`blog/c/any/${id}/`);
    return response.data;
  } catch (err) {
    console.log("err", err);
  }
};

export const deleteBlogById = async ({ id }: { id: string | number }) => {
  const response = await http.delete(`blog/b/admin/${id}/`);
  return response.data;
};
