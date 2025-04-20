import { z } from "zod";

export const personalRegisterSchema = z.object({
  first_name: z
    .string()
    .regex(/^[\u0600-\u06FF\s]+$/, "نام باید فقط شامل حروف فارسی و فاصله باشد")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام  نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),


  last_name: z
    .string()
    .regex(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی باید فقط شامل حروف فارسی و فاصله باشد")
    .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),



});

export type PersonalRegisterFormData = z.infer<typeof personalRegisterSchema>; 