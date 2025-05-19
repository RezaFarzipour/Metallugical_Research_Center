import { z } from "zod";

export const AdminReserveInputsSchema = z.object({
  reserve_duration: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "مدت زمان اجاره الزامی است" })
      
  ),

  total_price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "قیمت کل الزامی است" })
    
  ),

  admin_description: z.string().optional(),
});

export type AdminReserveInputsFormData = z.infer<typeof AdminReserveInputsSchema>;
