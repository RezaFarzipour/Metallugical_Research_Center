import { AxiosRequestConfig } from "axios";
import http from "./httpService";

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

export const getAllUserAdmin = async () => {
  const response = await http.get(`user/admin/`);
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
  phone_number: string;
  data: { first_name: string; last_name: string; email: string; role: string,username:string,phone_number:string,  is_signup:boolean };
}) => {
  try {
    console.log("edit data", data);

    const response = await http.patch(`user/admin/${phone_number}/`, data);
    return response.data;
  } catch (err) {
    console.log("eddit err", err);

    throw err;
  }
};


export const deleteUser = ({phone_number}:{phone_number:string})=>{
  return http.delete(`user/admin/${phone_number}/`)
}