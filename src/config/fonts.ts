import LocalFont from "next/font/local";

export const fontIRANYekan = LocalFont({
  src: [
    {
      path: "../../public/fonts/woff2/IRANYekanWebRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/woff2/IRANYekanWebMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/woff2/IRANYekanWebBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/woff2/IRANYekanWebExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/woff2/IRANYekanWebBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-IRANYekan",
  display: "swap", // یا "block" بسته به نیاز
});
