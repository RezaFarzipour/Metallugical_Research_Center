// stores/useBlogFormStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BlogFormState = {
    step: number
    formData: {
        title: string
        category: string
        content: string
        image?: File | null
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
                    },
                }),
        }),
        { name: 'blog-form-store' }
    )
)
