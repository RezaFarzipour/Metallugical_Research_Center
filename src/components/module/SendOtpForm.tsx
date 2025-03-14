import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneFormData } from "@/schemas/phoneSchema";
import Button from "@/components/element/Button";
import RHFInput from "../element/RHFInput";
interface SendOtpFormProps {
  onSubmit: (data: PhoneFormData) => void;
}

const SendOtpForm: React.FC<SendOtpFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <p className="text-gray-700 leading-none">ورود | ثبت نام</p>
      <p className="text-gray-700 leading-none">سلام!</p>

      <RHFInput<PhoneFormData>
        register={register}
        errors={errors}
        label="شماره موبایل"
        type="tel"
        dir="ltr"
        name="phone"
      />

      <Button type="submit" variant="secondary" fullWidth>
        ارسال کد تایید
      </Button>
    </form>
  );
};

export default SendOtpForm;
