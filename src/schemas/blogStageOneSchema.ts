import { z } from "zod";

export const blogStageOneSchema = z.object({
    title: z.string().min(1, "عنوان الزامی است"),
    cover_image: z
        .union([
            z.instanceof(File).refine((file) => file.size > 0, { message: "فایل الزامی است" }),
            z.null(),
        ])
        .optional(),
    slug: z.string().min(1, "اسلاگ الزامی است"),
    tags: z.array(z.string()).min(1, "حداقل یک تگ وارد کنید"), category_list: z.array(z.string()).min(1, "دسته‌بندی الزامی است"),
});


export type BlogStageOneFormData = z.infer<typeof blogStageOneSchema>;
