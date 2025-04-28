import { z } from "zod";

export const creaateServiceImagesSchema = z.object({
    images: z.array(z.instanceof(File)).min(1, "آپلود حداقل یک عکس الزامی است"),
});

export type CreaateServiceImagesFormData = z.infer<typeof creaateServiceImagesSchema>;
