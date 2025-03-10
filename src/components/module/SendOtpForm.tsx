import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneFormData } from "@/schemas/phoneSchema";
import PhoneInput from "../element/PhoneInput";
import Button from "../element/Button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PhoneInput register={register} errors={errors} />

      <Button type="submit" variant="secondary" fullWidth>
        ارسال کد تایید
      </Button>
    </form>
  );
};

export default SendOtpForm;
