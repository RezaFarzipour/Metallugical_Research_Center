import { useEffect, useRef, useState } from "react";

//threshold: این تابع برای مشاهده تغییرات در وضعیت نمایش یک عنصر در viewport استفاده می‌شود
const useIntersectionObserver = (threshold: number = 0.5) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

export default useIntersectionObserver;
