import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendOtp, checkOtp } from "@/services/api/auth";
import { sendUserProfile } from "@/services/api/user";
import { useGetUser } from "@/hooks/useAuth";
import { showToast } from "@/store/useToastSlice";
import { PhoneFormData } from "@/schemas/phoneSchema";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import { User } from "@/types";

const RESEND_TIME = 90;

export const useSigninFlow = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkOtpLoading, setCheckOtpLoading] = useState(false);

  const router = useRouter();
  const { data } = useGetUser();
  // اگر response وجود داشت، دیتا رو بگیر؛ وگرنه null باشه
  const user: User | null = data ?? null;

  const sendOtpHandler = async (data: PhoneFormData) => {
    setLoading(true);
    setPhoneNumber(data.phone);
    try {
      const { response } = await sendOtp(data.phone);

      const message = response?.data.message;
      showToast(message, "success");
      setStep(2);
    } catch {
      showToast("خطایی رخ داده است", "error");
    } finally {
      setLoading(false);
    }
  };

  type OtpErrorResponse = {
    message: string;
  };
  const checkOtpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCheckOtpLoading(true);
    try {
      const { response, error } = await checkOtp(phoneNumber, otp);

      if (error) {
        const errorMessage =
          (error.response?.data as OtpErrorResponse)?.message ||
          "کد وارد شده صحیح نیست";
        showToast(errorMessage, "error");
        return;
      }
      if (!response) return;
      const { data } = response;
      const userRoles = user?.role;

      if (!data.is_signup) {
        setStep(3);
      } else {
        router.push(userRoles === "customer" ? "/user/home" : "/admin/home");
      }
    } catch {
      showToast(
        "خطا رخ داده است .صفحه ها مجددا بارگزاری و دوباره تلاش کنید",
        "error"
      );
    } finally {
      setCheckOtpLoading(false);

    }
  };

  const { mutateAsync, isPending: isPersonalRegistering } = useMutation({
    mutationKey: ["send-user-profile"],
    mutationFn: sendUserProfile,
  });

  const onSubmitPersonalRegister = async (data: PersonalRegisterFormData) => {

    const payload = {
      username: phoneNumber,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      is_signup: true,
      phone_number: phoneNumber,
      role: "customer",
    };

    try {
      await mutateAsync({
        phone_number: phoneNumber,
        data: payload,
      });

      router.push("/"); // بعد از ثبت‌نام موفق
    } catch {
      showToast("ثبت‌نام با خطا مواجه شد", "error");
    }

  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // OTP Timer
  useEffect(() => {
    if (step !== 2 || time <= 0) return;
    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, time]);

  return {
    step,
    setStep,
    otp,
    handleOtpChange,
    time,
    phoneNumber,
    loading, checkOtpLoading, isPersonalRegistering,
    sendOtpHandler,
    checkOtpHandler,
    onSubmitPersonalRegister,
  };
};
