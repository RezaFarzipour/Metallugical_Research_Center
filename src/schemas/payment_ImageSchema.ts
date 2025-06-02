import { z } from "zod";

// Regex برای تایید کاراکترهای فارسی

export const paymentImageSchema = z.object({


    payment_image: z
        .union([
            z.instanceof(File).refine((file) => file.size > 0, { message: "فایل الزامی است" }),
            z.null(),
        ])
        .optional(),
});

export type PaymentFormData = z.infer<typeof paymentImageSchema>;
