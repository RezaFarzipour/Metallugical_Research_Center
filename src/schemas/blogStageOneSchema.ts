import { z } from "zod";

export const blogStageOneSchema = z.object({
    title: z.string().min(1, "عنوان الزامی است"),
    coverImage: z.string().url("آدرس عکس معتبر نیست"),
    slug: z.string().min(1, "اسلاگ الزامی است"),
    tags: z.string().min(1, "تگ الزامی است"),
});

export type BlogStageOneFormData = z.infer<typeof blogStageOneSchema>;
