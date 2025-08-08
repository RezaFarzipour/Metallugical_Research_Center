import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { showToast } from "@/store/useToastSlice";
import { CreaateServiceImagesFormData } from "@/schemas/creaateServiceImagesSchema";

import { serviceDataEditType } from "@/types/serviceType";
import {
  useCreateCourseDateRange,
  useCreateCourseImages,
} from "./useCreateCource";
import {
  useEditCourseDateRangeById,
  useEditCourseImage,
} from "./useEditCource";
import { useDeleteCourseImage } from "./useDeleteCource";

interface UseSecondStepLogicProps {
  filteredServiceImages: Array<{
    id: string | number;
    image?: string;
    service?: string;
  }>;
  serviceId: string | number | undefined;
  serviceRangeDate?: serviceDataEditType;
  setStep?: (step: number) => void;
  reset: () => void;
}

export function useSeCondStepAction({
  filteredServiceImages = [],
  serviceRangeDate,
  serviceId,
  reset,
}: UseSecondStepLogicProps) {
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);
  const { createServiceImage, isCreatingImage } = useCreateCourseImages();
  const { editServiceImage, isEditingImage } = useEditCourseImage();
  const { deletServiceImage } = useDeleteCourseImage();
  const { isCreatingDateRange, createDateRange } = useCreateCourseDateRange();
  const { editServiceDateRange } = useEditCourseDateRangeById();

  const router = useRouter();

  // تعیین شناسه دوره آموزشی، ترجیحا از filteredServiceImages و در غیر اینصورت از props
  const serviceIdNumber = filteredServiceImages[0]?.service ?? serviceId;

  // ویرایش عکس
  const handleEditImage = async (index: number, file: File) => {
    const imageId = filteredServiceImages[index]?.id;
    if (!imageId) {
      showToast("شناسه تصویر موجود نیست.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("service", String(serviceIdNumber));

    await editServiceImage(
      { id: String(imageId), data: formData },
      {
        onSuccess: () => {
          showToast("عکس با موفقیت ویرایش شد", "success");
          router.refresh();
        },
        onError: () => {
          showToast("ویرایش عکس با خطا مواجه شد", "error");
        },
      }
    );
  };

  // حذف عکس
  const handleDeleteImage = async (index: number) => {
    const imageId = filteredServiceImages[index]?.id;
    if (!imageId) {
      showToast("شناسه تصویر موجود نیست.", "error");
      return;
    }

    try {
      await deletServiceImage(
        { id: String(imageId) },
        {
          onSuccess: () => {
            showToast("عکس با موفقیت حذف شد", "success");
            setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
            router.refresh();
          },
          onError: () => {
            showToast("حذف عکس با خطا مواجه شد", "error");
          },
        }
      );
    } catch {
      showToast("خطا در حذف عکس", "error");
    }
  };
  const pathname = usePathname();
  const isCoursePath = pathname.includes("/admin/courses");

  const onSubmit = async (data: CreaateServiceImagesFormData) => {
    const isEditSession = Boolean(
      serviceRangeDate?.["service-reserve_date"]?.[0]?.id
    );

    if (!serviceIdNumber) {
      showToast("شناسه دوره آموزشی موجود نیست.", "error");
      return;
    }

    // فقط در حالت ساخت دوره آموزشی چک کنیم که عکس وجود داشته باشه
    if (
      !isEditSession &&
      !isCoursePath &&
      (!data.images || data.images.length === 0)
    ) {
      showToast("لطفا حداقل یک عکس انتخاب کنید", "error");
      return;
    }

    try {
      // ارسال عکس‌ها
      for (const file of data.images) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("service", String(serviceIdNumber));

        await createServiceImage(formData, {
          onSuccess: () => {
            showToast("عکس جدید با موفقیت اضافه شد", "success");
          },
          onError: () => {
            showToast("خطا در اضافه کردن عکس", "error");
          },
        });
      }

      // اگر بازه تاریخ انتخاب شده بود، آن را بفرست
      if (selectedRange) {
        const reservedFrom = selectedRange.from.toISOString().split("T")[0];
        const reservedTo = selectedRange.to.toISOString().split("T")[0];
        const dateData = {
          reserved_from: reservedFrom,
          reserved_to: reservedTo,
          service: serviceIdNumber,
        };

        const RangeId = serviceRangeDate?.["service-reserve_date"]?.[0]?.id;

        if (RangeId) {
          const formData = new FormData();
          formData.append("reserved_from", dateData.reserved_from);
          formData.append("reserved_to", dateData.reserved_to);
          formData.append("service", String(dateData.service));
          if (isCoursePath) {
            formData.append("is_package", "true");
          }
          await editServiceDateRange(
            { id: String(RangeId), data: formData },
            {
              onSuccess: () => {
                showToast("بازه‌ی زمانی با موفقیت ویرایش شد", "success");
              },
              onError: () => {
                showToast("خطا در ویرایش بازه زمانی", "error");
              },
            }
          );
        } else {
          const formData = new FormData();
          formData.append("reserved_from", dateData.reserved_from);
          formData.append("reserved_to", dateData.reserved_to);
          formData.append("service", String(dateData.service));
          await createDateRange(
            { data: formData },
            {
              onSuccess: () => {
                showToast("بازه زمانی با موفقیت اضافه شد", "success");
              },
              onError: () => {
                showToast("خطا در ذخیره بازه زمانی", "error");
              },
            }
          );
        }
      }

      reset();
      setNewImageUrls([]);
      router.push(`/admin/${isCoursePath ? "courses" : " services"}`);
    } catch {
      showToast("خطا در ارسال اطلاعات", "error");
    }
  };

  const handleRangeSelect = (from: Date, to: Date) => {
    setSelectedRange({ from, to });
  };

  return {
    existingImageUrls,
    newImageUrls,
    isCreatingImage,
    isEditingImage,
    isCreatingDateRange,
    onSubmit,
    handleEditImage,
    handleDeleteImage,
    handleRangeSelect,
    setNewImageUrls,
    setExistingImageUrls,
  };
}
