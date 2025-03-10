import { z } from "zod";

export const phoneSchema = z.object({
    phone: z
        .string()
        .min(11, "شماره موبایل باید ۱۱ رقم باشد")
        .max(11, "شماره موبایل باید ۱۱ رقم باشد")
        .regex(/^09/, "شماره موبایل باید با ۰۹ شروع شود")
        .regex(/^\d+$/, "شماره موبایل فقط باید شامل اعداد باشد"),
});

export type PhoneFormData = z.infer<typeof phoneSchema>; 