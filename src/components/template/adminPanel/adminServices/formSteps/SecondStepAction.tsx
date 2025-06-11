"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import FileInput from "@/components/element/FileInput";
import Image from "next/image";
import { IoTrashBinOutline } from "react-icons/io5";
import {
  CreaateServiceImagesFormData,
  creaateServiceImagesSchema,
} from "@/schemas/creaateServiceImagesSchema";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import AdminDateRangePicker from "@/components/module/customeDataPicker/AdminDateRangePicker";
import TitleStructure from "@/components/element/TitleStructure";
import { BtnLoader } from "@/components/element/Loader";
import { useSeCondStepAction } from "../hooks/useSecondStepAction";
import { serviceDataEditType } from "@/types";

interface ServiceImage {
  id: string | number;
  image: string;
}
interface ServicesActionProps {
  filteredServiceImages?: ServiceImage[];
  serviceRangeDate: serviceDataEditType;
  serviceId?: string | number | undefined;
  setStep?: (step: number) => void;
}

const SecondStepAction: React.FC<ServicesActionProps> = ({
  filteredServiceImages = [],
  serviceId,
  setStep,
  serviceRangeDate,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
  } = useForm<CreaateServiceImagesFormData>({
    mode: "onTouched",
    // resolver: zodResolver(creaateServiceImagesSchema),
    defaultValues: {
      images: [],
    },
  });

  //customeHook:
  const {
    existingImageUrls,
    newImageUrls,
    isCreatingImage,
    isEditingImage,
    onSubmit,
    handleEditImage,
    handleDeleteImage,
    setNewImageUrls,
    setExistingImageUrls,
    handleRangeSelect,
  } = useSeCondStepAction({
    filteredServiceImages,
    serviceId,
    serviceRangeDate,
    setStep,
    reset,
  });

  const memoizedImageUrls = React.useMemo(() => {
    return filteredServiceImages.length > 0
      ? filteredServiceImages.map((img) => img.image)
      : [];
  }, [filteredServiceImages]);

  useEffect(() => {
    setExistingImageUrls((prevUrls) => {
      // چک می‌کنیم آیا url ها تغییر کرده‌اند یا نه
      const isEqual =
        prevUrls.length === memoizedImageUrls.length &&
        prevUrls.every((url, i) => url === memoizedImageUrls[i]);

      if (isEqual) return prevUrls; // اگه برابر بودند، state رو تغییر نده
      return memoizedImageUrls; // در غیر این صورت آپدیت کن
    });
  }, [memoizedImageUrls]);

  // حذف عکس جدید انتخاب شده از فرم و state
  const handleRemoveNewImage = (index: number) => {
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));

    const currentImages = getValues("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  };

  return (
    <div className="text-default-700 p-8 flex flex-col md:flex-row gap-10 items-start">
      {/* تصاویر موجود با امکان ویرایش */}
      <div className=" flex flex-col gap-y-8 bg-white p-4 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold">تصاویر موجود</h2>
        {existingImageUrls.length > 0 || newImageUrls.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-40">
            {existingImageUrls.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative aspect-[2/1] overflow-hidden rounded-md"
              >
                <Image
                  fill
                  alt={`uploaded-image-${index}`}
                  src={url}
                  className="object-cover object-center"
                />
                <label className="absolute left-1 top-1 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                  <TbEyeDiscount />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleEditImage(index, file);
                      }
                    }}
                  />
                </label>
                <label
                  onClick={() => handleDeleteImage(index)}
                  className="absolute left-9 top-1 bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer"
                >
                  <MdDeleteOutline />
                </label>
                {/* <Button isIconOnly></Button> */}
              </div>
            ))}
            {newImageUrls.map((url, index) => (
              <div
                key={`new-${index}`}
                className="relative aspect-[2/1] overflow-hidden rounded-md"
              >
                <Image
                  fill
                  alt={`new-uploaded-image-${index}`}
                  src={url}
                  className="object-cover object-center"
                />
                <Button
                  type="button"
                  onPress={() => handleRemoveNewImage(index)}
                  isIconOnly
                  className="w-8 h-8 absolute left-1 top-2 bg-red-100"
                >
                  <IoTrashBinOutline size={20} color="red" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>هیچ تصویری موجود نیست.</p>
        )}
      </div>

      {/* فرم اضافه کردن تصاویر جدید */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-8 bg-white p-4 rounded-xl w-full max-w-lg"
      >
        <TitleStructure>اضافه کردن تاریخ رزرو دستگاه</TitleStructure>
        <div>
          <AdminDateRangePicker onRangeSelect={handleRangeSelect} />
        </div>
        <TitleStructure>اضافه کردن تصاویر جدید</TitleStructure>

        <Controller
          name="images"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب عکس‌های جدید"
              multiple={true}
              errors={errors}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                  const fileArray = Array.from(files).filter((file) =>
                    file.type.startsWith("image/")
                  );
                  const currentImages = getValues("images") || [];
                  const updatedImages = [...currentImages, ...fileArray];
                  onChange(updatedImages);

                  const newUrls = fileArray.map((file) =>
                    URL.createObjectURL(file)
                  );
                  setNewImageUrls((prev) => [...prev, ...newUrls]);
                }
              }}
              {...rest}
            />
          )}
        />

        <div>
          {isCreatingImage || isEditingImage ? (
            <BtnLoader color="#2d66cf" />
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

export default SecondStepAction;
