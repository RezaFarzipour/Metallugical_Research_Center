import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/useToastSlice";
import { CreaateServiceImagesFormData } from "@/schemas/creaateServiceImagesSchema";
import { useEditServiceDateRangeById, useEditServiceImage } from "./useEditService";
import { useCreateServiceDateRange, useCreateServiceImages } from "./useCreateService";
import { useDeleteServiceImage } from "./useDeleteService";

interface ServiceReserveDate {
    id: number;
    reserved_from: string;
    reserved_to: string;
    service: number;
}
interface UseSecondStepLogicProps {
    filteredServiceImages: Array<{ id: string; service?: string | number }>;
    serviceId: string | number;
    serviceRangeDate?: ServiceReserveDate[];
    setStep?: (step: number) => void;
    reset: () => void;
}

export function useSeCondStepAction({
    filteredServiceImages = [],
    serviceRangeDate,
    serviceId,
    setStep,
    reset,
}: UseSecondStepLogicProps) {
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
    const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
    console.log("serviceRangeDate", serviceRangeDate);


    const { createServiceImage, isCreatingImage } = useCreateServiceImages();
    const { editServiceImage, isEditingImage } = useEditServiceImage();
    const { deletServiceImage } = useDeleteServiceImage();
    const { isCreatingDateRange, createDateRange } = useCreateServiceDateRange();
    const { editServiceDateRange } = useEditServiceDateRangeById();


    const router = useRouter();

    // تعیین شناسه سرویس، ترجیحا از filteredServiceImages و در غیر اینصورت از props
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

    // ارسال تصاویر جدید
    const onSubmit = async (data: CreaateServiceImagesFormData) => {
        if (!serviceIdNumber) {
            showToast("شناسه سرویس موجود نیست.", "error");
            return;
        }

        if (!data.images || data.images.length === 0) {
            showToast("لطفا حداقل یک عکس انتخاب کنید", "error");
            return;
        }

        try {
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

            reset();
            setNewImageUrls([]);
            setStep?.(1);
            router.push("/admin/services");
        } catch {
            showToast("خطا در ارسال عکس‌ها", "error");
        }
    };


    const handleRangeSelect = (from: Date, to: Date) => {
        if (!serviceIdNumber) {
            showToast("شناسه سرویس موجود نیست.", "error");
            return;
        }

        const reservedFrom = from.toISOString().split("T")[0]; // YYYY-MM-DD
        const reservedTo = to.toISOString().split("T")[0];

        const data = {
            reserved_from: reservedFrom,
            reserved_to: reservedTo,
            service: serviceIdNumber
        };

        const RangeId = serviceRangeDate?.["service-reserve_date"][0].id
        if (RangeId) {
            editServiceDateRange(
                { id: RangeId, data },
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
            createDateRange(data, {
                onSuccess: () => {
                    showToast("بازه زمانی با موفقیت اضافه شد", "success");
                },
                onError: () => {
                    showToast("خطا در ذخیره بازه زمانی", "error");
                },
            });
        }
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
