import { z } from "zod";

// Regex برای تایید کاراکترهای فارسی

export const createServiceSchema = z.object({
    service_name: z
        .string()
        .min(2, "نام محصول باید حداقل ۲ کاراکتر باشد")
        .max(100, "نام محصول خیلی طولانی است"),

    description: z
        .string()
        .min(5, "توضیحات باید حداقل ۵ کاراکتر داشته باشد")
        .max(500, "توضیحات خیلی طولانی است"),

    price: z
        .union([
            z.string().regex(/^\d+$/, "قیمت باید فقط شامل عدد باشد"),
            z.number().nonnegative("قیمت نمی‌تواند منفی باشد"),
        ])
        .transform((val) => (typeof val === "string" ? parseInt(val) : val)),

    cover_image: z
        .union([
            z.instanceof(File).refine((file) => file.size > 0, { message: "فایل الزامی است" }),
            z.null(),
        ])
        .optional(),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
