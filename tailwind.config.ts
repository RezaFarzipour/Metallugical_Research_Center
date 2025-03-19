import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(breadcrumbs|button|card|divider|image|input|input-otp|navbar|pagination|table|ripple|spinner|form|checkbox|spacer).js"
  ],
  darkMode: 'class',
  theme: {
    extend: {

      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        sans: ["var(--font-IRANYekan)", ...fontFamily.sans],
      },
    },
  },
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          default: {
            "50": "#F3F4F6",
            "100": "#E5E7EB",
            "200": "#D1D5DB",
            "300": "#9CA3AF",
            "400": "#6B7280",
            "500": "#374151",
            "600": "#555775",
            "700": "#111827",
            "800": "#1F2937",
            "900": "#111827",
            "foreground": "#000",
            "DEFAULT": "#F3F4F6"
          },
          primary: {
            "50": "#e9f2f8",
            "100": "#cbe0ef",
            "200": "#accde5",
            "300": "#8ebbdb",
            "400": "#6fa8d2",
            "500": "#5196c8",
            "600": "#437ca5",
            "700": "#356282",
            "800": "#26475f",
            "900": "#182d3c",
            "foreground": "#000",
            "DEFAULT": "#5196c8"
          },
          secondary: {
            "50": "#e6efff",
            "100": "#c3d8fe",
            "200": "#a0c1fd",
            "300": "#7daafc",
            "400": "#5a93fc",
            "500": "#377cfb",
            "600": "#2d66cf",
            "700": "#2451a3",
            "800": "#1a3b77",
            "900": "#11254b",
            "foreground": "#000",
            "DEFAULT": "#377cfb"
          }
        }
      },
      dark: {
        colors: {
          primary: {
            "50": "#182d3c",
            "100": "#26475f",
            "200": "#356282",
            "300": "#437ca5",
            "400": "#5196c8",
            "500": "#6fa8d2",
            "600": "#8ebbdb",
            "700": "#accde5",
            "800": "#cbe0ef",
            "900": "#e9f2f8",
            "foreground": "#fff",
            "DEFAULT": "#6fa8d2"
          },
          secondary: {
            "50": "#11254b",
            "100": "#1a3b77",
            "200": "#2451a3",
            "300": "#2d66cf",
            "400": "#377cfb",
            "500": "#5a93fc",
            "600": "#7daafc",
            "700": "#a0c1fd",
            "800": "#c3d8fe",
            "900": "#e6efff",
            "foreground": "#fff",
            "DEFAULT": "#5a93fc"
          }
        }
      }
    }
  })],
} satisfies Config;
