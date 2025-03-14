import { z } from "zod";

export const personalRegisterSchema = z.object({
    name: z
        .string()
        .regex(/^[\u0600-\u06FF\s]+$/, "نام و نام خانوادگی باید فقط شامل حروف فارسی و فاصله باشد")
        .min(8, "نام و نام خانوادگی باید حداقل ۸ کاراکتر باشد")
        .max(50, "نام و نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد")

});

export type PersonalRegisterFormData = z.infer<typeof personalRegisterSchema>; 