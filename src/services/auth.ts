import { AxiosResponse } from "axios";
import http from "./httpService";

export interface SendOtpResponse {
  message: string;
}

export const sendOtp = async (
  phone: string
): Promise<{ response?: AxiosResponse<SendOtpResponse>; error?: unknown }> => {
  try {
    const response = await http.get(`authentication/otp/send-code/${phone}/`);

    return { response };
  } catch (error) {
    return { error };
  }
};

export const checkOtp = async (
  phone: string,
  otp: string
): Promise<{ response?: AxiosResponse; error?: unknown }> => {
  try {
    const response = await http.post(
      `authentication/otp/verify-code/${phone}/`,

      {
        code: otp,
      },
    
    );
    return { response };
  } catch (error) {
    console.log("verify error", error?.response?.data || error);
    return { error };
  }
};




export const usercustomer = async (
 
)  => {
  try {
    const response = await http.get(
      'user/customer/',

     
     
    );
    return { response };
  } catch (error) {
    console.log("verify error", error?.response?.data || error);
    return { error };
  }
};
