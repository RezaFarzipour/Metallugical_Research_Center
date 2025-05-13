// hooks/useVisibleCount.ts
import { useEffect, useState } from "react";

type Breakpoints = {
    sm: number;
    md: number;
    lg: number;
};

export const useVisibleCount = (breakpoints: Breakpoints = { sm: 4, md: 4, lg: 6 }) => {
    const [visibleCount, setVisibleCount] = useState(breakpoints.lg);

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCount(breakpoints.sm);
            } else if (width < 1024) {
                setVisibleCount(breakpoints.md);
            } else {
                setVisibleCount(breakpoints.lg);
            }
        };

        updateVisibleCount(); // initial call
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, [breakpoints]);

    return visibleCount;
};
