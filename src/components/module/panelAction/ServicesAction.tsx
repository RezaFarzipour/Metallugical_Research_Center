"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@heroui/button";
import { IoTrashBinOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  CreateServiceFormData,
  createServiceSchema,
} from "@/schemas/createServiceSchema";
import ServiceDetailsForm from "@/components/module/controller/ServiceDetailsForm";
import { showToast } from "@/store/useToastSlice";
import FileInput from "@/components/element/FileInput";
import useCreateService from "@/components/template/adminPanel/AdminServices/useCreateService";
import useEditService from "@/components/template/adminPanel/AdminServices/useEditService";
import { imageUrlToFile } from "@/utils/fileFormatter";
import BtnLoader from "@/components/element/BtnLoader";
import { serviceDataEditType } from "@/types";

interface ServicesActionProps {
  serviceDataEdit?: Partial<serviceDataEditType>;
}

const ServicesAction: React.FC<ServicesActionProps> = ({
  serviceDataEdit = {},
}) => {
  const { id: editId } = serviceDataEdit;
  const isEditSession = Boolean(editId);

  const {
    service_name,
    description,
    price,
    cover_image: prevCoverImageUrl,
  } = serviceDataEdit;

  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    prevCoverImageUrl || null
  );

  const { createService, isCreating } = useCreateService();
  const { editService, isEditing } = useEditService();
  const router = useRouter();

  const parsedPrice =
    price !== undefined
      ? typeof price === "string"
        ? Number.isNaN(parseInt(price))
          ? undefined
          : parseInt(price)
        : price
      : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CreateServiceFormData>({
    mode: "onTouched",
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      service_name: service_name || "",
      description: description || "",
      price: parsedPrice,
      cover_image: null,
    },
  });

  useEffect(() => {
    if (prevCoverImageUrl && isEditSession) {
      async function fetchImage() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("cover_image", file); // تنظیم فایل برای فیلد cover_image
        setCoverImageUrl(URL.createObjectURL(file)); // نمایش تصویر قبلی
      }
      fetchImage();
    }
  }, [editId, prevCoverImageUrl, isEditSession, setValue]);

  const onSubmit = async (data: CreateServiceFormData) => {
    const formData = new FormData();
    formData.append("service_name", data.service_name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    // اگر کاربر تصویر جدیدی انتخاب کرده باشد، آن را اضافه کن.
    if (data.cover_image) {
      formData.append("cover_image", data.cover_image);
    }

    console.log("📦 FormData for submit:", [...formData.entries()]);

    if (isEditSession && editId) {
      editService(
        { id: String(editId), data: formData },
        {
          onSuccess: () => {
            showToast("سرویس با موفقیت ویرایش شد", "success");
            router.push("/admin/services");
            reset();
          },
          onError: () => {
            showToast("ویرایش سرویس با خطا مواجه شد", "error");
          },
        }
      );
    } else {
      createService(formData, {
        onSuccess: () => {
          showToast("سرویس با موفقیت ساخته شد", "success");
          // router.push("/admin/services");
        },
        onError: () => {
          showToast("ساخت سرویس با خطا مواجه شد", "error");
        },
      });
    }
  };

  return (
    <div className="text-default-700 p-8 flex flex-col md:flex-row gap-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 bg-white p-4 rounded-xl w-full max-w-lg"
      >
        <ServiceDetailsForm register={register} errors={errors} />

        <Controller
          name="cover_image"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => {
            return (
              <FileInput
                label="انتخاب کاور محصول"
                errors={errors}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const file = event.target.files?.[0];
                  console.log("Selected File:", file);
                  if (file) {
                    onChange(file);
                    setCoverImageUrl(URL.createObjectURL(file));
                  }
                }}
                {...rest} // اینجا name هم هست، پس پراپ name رو جدا نفرستید
              />
            );
          }}
        />

        {coverImageUrl && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-md">
            <Image
              fill
              alt="cover-image"
              src={coverImageUrl}
              className="object-cover object-center"
            />
            <Button
              type="button"
              onClick={() => {
                setCoverImageUrl(null);
                setValue("cover_image", null);
              }}
              isIconOnly
              className="w-8 h-8 absolute left-1 top-2 bg-red-100"
            >
              <IoTrashBinOutline size={20} color="red" />
            </Button>
          </div>
        )}

        <div>
          {isCreating || isEditing ? (
            <BtnLoader />
          ) : (
            <Button type="submit" className="w-full">
              تایید
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServicesAction;
