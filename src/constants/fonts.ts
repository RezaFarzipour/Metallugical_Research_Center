import LocalFont from "next/font/local";

export const fontIranYekan = LocalFont({
  src: [
    {
      path: "../assets/woff/IRANYekanWebLight.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/woff/IRANYekanWebRegular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/woff/IRANYekanWebMedium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/woff/IRANYekanWebBold.woff",
      weight: "700",
      style: "normal",
    },

  ],
  variable: "--font-IRANYekan",
  display: "swap", // یا "block" بسته به نیاز
});
