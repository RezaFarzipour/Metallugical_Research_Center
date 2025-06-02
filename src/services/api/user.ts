
import { AxiosRequestConfig } from "axios";
import http from "../httpService";

export const sendUserProfile = async ({
  phone_number,
  data,
}: {
  phone_number: string;
  data: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
  };
}) => {
  const response = await http.patch(`user/customer/${phone_number}/`, data);
  return response.data;
};

export const getAllUserAdmin = async (options) => {
  const response = await http.get(`user/admin/`, options);
  return response.data;
};

export const getUserByPhoneNumberAdmin = async (
  phone_number: string,
  options: AxiosRequestConfig
) => {
  try {
    const response = await http.get(`user/admin/${phone_number}/`, options);
    return response.data;
  } catch (error) {
    console.log("errrr", error);
    throw error;
  }
};

export const editUserByPhoneNumberAdmin = async ({
  phone_number,
  data,
}: {
  phone_number: string | undefined;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    username?: string;
    phone_number?: string
    is_signup?: boolean;
  };
}) => {
  try {
    const response = await http.patch(`user/admin/${phone_number}/`, data);
    return response.data;
  } catch (err) {
    console.log("eddit err", err);

    throw err;
  }
};


export const editUserByPhoneNumberUser = async ({
  phone_number,
  data,
}: {
  phone_number: string | undefined;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    username?: string;
    phone_number?: string
    is_signup?: boolean;
  };
}) => {
  try {
    const response = await http.patch(`user/customer/${phone_number}/`, data);
    return response.data;
  } catch (err) {
    console.log("eddit err", err);

    throw err;
  }
};



export const editUserByPhoneNumber = async ({
  phone_number,
  data,
  role,
}: {
  phone_number: string | undefined;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    role?: string;
    username?: string;
    phone_number?: string;
    is_signup?: boolean;
  };
  role?: string;
}) => {
  if (role === "admin") {
    return await editUserByPhoneNumberAdmin({ phone_number, data });
  } else {
    return await editUserByPhoneNumberUser({ phone_number, data });
  }
};

export const deleteUser = ({ phone_number }: { phone_number: string }) => {
  return http.delete(`user/admin/${phone_number}/`);
};
