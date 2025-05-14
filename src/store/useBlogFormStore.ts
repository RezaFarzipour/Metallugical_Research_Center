import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type EditorItem = {
    id: string;
    type: 'text' | 'image';
    content: string;
};
type BlogFormState = {
    step: number
    formData: {
        id?: string;
        title: string
        category: string
        content: string
        image?: File | null
        items: EditorItem[];
    }
    setStep: (step: number) => void
    setFormData: (data: Partial<BlogFormState['formData']>) => void
    resetForm: () => void
}

export const useBlogFormStore = create<BlogFormState>()(
    persist(
        (set) => ({
            step: 1,
            formData: {
                title: '',
                category: '',
                content: '',
                image: null,
                items: [],
            },
            setStep: (step) => set({ step }),
            setFormData: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data },
                })),
            resetForm: () =>
                set({
                    step: 1,
                    formData: {
                        title: '',
                        category: '',
                        content: '',
                        image: null,
                        items: [],
                    },
                }),
        }),
        { name: 'blog-form-store' }
    )
)
