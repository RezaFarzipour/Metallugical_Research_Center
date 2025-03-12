import { Variants } from "framer-motion";

// تایپ برای جهت‌های اسلاید
type Direction = "left" | "right" | "up" | "down";

// تایپ برای نوع انیمیشن
type AnimationType = "spring" | "tween" | "linear";

// 1. imageReveal
export const imageReveal = (delay: number = 0, width: number): Variants => {
    const duration = Math.random() * 1.2 + 0.3;
    return {
        hidden: {
            width: 0,
            opacity: 0,
            scale: 0,
        },
        show: {
            width: `${width}px`,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                delay,
                duration,
                ease: "easeOut",
            },
        },
    };
};

// 2. shimmerEffect
export const shimmerEffect = (): Variants => {
    return {
        initial: { x: "-100%" },
        animate: { x: "100%" },
        transition: {
            duration: 1,
            ease: "linear",
            repeat: 0,
        },
    };
};

// 3. fadeIn
export const fadeIn = (
    delay: number = 0,
    duration: number = 1,
    opacity: number = 1
): Variants => {
    return {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity,
            transition: {
                type: "tween",
                delay,
                duration,
                ease: "easeOut",
            },
        },
    };
};

// 4. slideIn
export const slideIn = (
    direction: Direction,
    type: AnimationType,
    delay: number,
    duration: number
): Variants => {
    return {
        hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                delay,
                duration,
                ease: "easeOut",
            },
        },
    };
};

// 5. fadeInSlide
export const fadeInSlide = (
    direction: Direction = "left",
    type: AnimationType = "tween",
    delay: number = 0,
    duration: number = 1
): Variants => {
    return {
        hidden: {
            x: direction === "left" ? "-20%" : direction === "right" ? "20%" : 0,
            y: direction === "up" ? "20%" : direction === "down" ? "20%" : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                delay,
                duration,
                ease: "easeOut",
            },
        },
    };
};

// 6. staggerContainer
export const staggerContainer = (
    staggerChildren: number,
    delayChildren: number = 0
): Variants => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren,
                delayChildren,
            },
        },
    };
};