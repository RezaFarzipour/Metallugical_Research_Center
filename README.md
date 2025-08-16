<div align="center">
  <img src="./public/readMe.png" alt="nextdotjs" />

<div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextjs" />
    <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logoColor=white&logo=framer&color=0055FF" alt="framer-motion" />
    <img src="https://img.shields.io/badge/-Hero_UI-black?style=for-the-badge&logoColor=white&logo=heroicons&color=38B2AC" alt="hero-ui" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Tiptap-black?style=for-the-badge&logoColor=white&logo=tiptap&color=4B5563" alt="tiptap" />
    <img src="https://img.shields.io/badge/-Leaflet-black?style=for-the-badge&logoColor=white&logo=leaflet&color=199900" alt="leaflet" />
    <img src="https://img.shields.io/badge/-Axios-black?style=for-the-badge&logoColor=white&logo=axios&color=5A29E4" alt="axios" />
    <img src="https://img.shields.io/badge/-React_Hook_Form-black?style=for-the-badge&logoColor=white&logo=reacthookform&color=EC5990" alt="react-hook-form" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    <img src="https://img.shields.io/badge/-Zustand-black?style=for-the-badge&logoColor=white&logo=zustand&color=FFCA28" alt="zustand" />
    <img src="https://img.shields.io/badge/-TanStack_Query-black?style=for-the-badge&logoColor=white&logo=tanstack&color=FF4154" alt="tanstack-query" />
    <img src="https://img.shields.io/badge/-GraphQL-black?style=for-the-badge&logoColor=white&logo=graphql&color=E10098" alt="graphql" />
</div>

  <h3 align="center"> Metallugical_Research_Center</h3>


</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🕸️ [Code to Copy](#snippets)
5. 🔗 [Assets](#links)

## <a name="introduction">🤖 Introduction</a>

Built with Next.js for a robust user interface, TypeScript for type-safe development, Hero UI for enhanced UI components, and styled with Tailwind CSS for a modern design, this web application powers a metallurgy platform with a captivating landing page, dual dashboards for admins and clients, and a secure phone-based login system using OTP verification. Users can seamlessly reserve testing equipment or enroll in educational courses, offering a tailored experience with specialized features for metallurgy professionals.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Framer Motion
- Hero-Ui
- Tailwind CSS
- tiptap
- leaflet
- axios
- react-hook-form
- zod
- zustand
- tanstack/react-query
- graphql

## <a name="features">🔋 Features</a>

👉 Secure OTP Authentication: Seamless login and sign-up using phone numbers with OTP verification for enhanced security.
👉 Captivating Landing Page: A visually appealing landing page designed to engage users with modern UI elements powered by Hero UI.
👉 Admin Panel:

Course & Blog Management: Add and manage educational courses and blogs (news and tutorials) using Tiptap for rich text editing.

Interactive Reservation System: Manage metallurgy testing equipment reservations with a dynamic, ping-pong-style interaction for real-time coordination and availability updates.

Reporting: Generate detailed reports for operational insights.

Service Management: Add and configure metallurgy services offered on the platform.
👉 User Panel:

Interactive Reservation System: User-friendly interface for clients to reserve testing equipment with real-time, ping-pong-style coordination and updates.

Reporting: Access personalized reports for reservation history and service usage.
👉 Responsive Design: Fully optimized for mobile, tablet, and desktop devices, ensuring a consistent and seamless experience.

and many more, including optimized performance, modular code architecture, and efficient data handling with GraphQL.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/RezaFarzipour/Metallugical_Research_Center
cd portfolio
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.ts</code></summary>

```ts
import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|badge|breadcrumbs|button|card|divider|drawer|dropdown|image|input|input-otp|navbar|pagination|radio|select|table|ripple|spinner|modal|menu|popover|form|listbox|scroll-shadow|checkbox|spacer).js",
  ],
  darkMode: "class",
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
  plugins: [
    heroui({
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
              foreground: "#000",
              DEFAULT: "#F3F4F6",
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
              foreground: "#000",
              DEFAULT: "#5196c8",
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
              foreground: "#000",
              DEFAULT: "#377cfb",
            },
          },
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
              foreground: "#fff",
              DEFAULT: "#6fa8d2",
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
              foreground: "#fff",
              DEFAULT: "#5a93fc",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
```

</details>

<details>
<summary><code>globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  scroll-behavior: smooth;
  outline: none;
  padding: 0;
  margin: 0;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: var(--font-IRANYekan);
  min-height: 100dvh;
  user-select: none;
}

/* HeroSection.css */
.perspective-custom {
  perspective: 200px;
  perspective-origin: 59% 85%;
}

.slider {
  background-image: url("../../public/images/hero.webp");
  background-size: 100%;
  transform: scaleX(0.85) scaleY(1) scaleZ(1) rotateX(3.5deg) rotateY(354deg) rotate(
      10deg
    )
    translateX(0) translateY(0) translateZ(0) skewX(0deg) skewY(0deg);
  animation: moveBackground 35s linear infinite;
  -webkit-animation: moveBackground 35s linear infinite;
}

@keyframes moveBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -1000px;
  }
}

/* List styles */

.blogUl__disc li {
  list-style-type: disc;
  margin-right: 20px;
}
.blogUl__decimal li {
  list-style-type: decimal;
  margin-right: 20px;
}
.tiptap :first-child {
  margin-top: 5px;
}
.tiptap ul,
.list-custome ul {
  list-style-type: disc;
  margin-right: 20px;
}

.tiptap ol,
.list-custome ol {
  list-style-type: decimal;
  margin-right: 20px;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.3;
  margin-top: 2.5rem;
  text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.tiptap h1 {
  font-size: 1.4rem;
}

.tiptap h2 {
  font-size: 1.2rem;
}

.tiptap h3 {
  font-size: 1.1rem;
}

.tiptap h4,
.tiptap h5,
.tiptap h6 {
  font-size: 1rem;
}

.tiptap pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}
.ProseMirror img {
  max-width: 100%;
  height: auto;
}

.br-custome blockquote,
.tiptap blockquote {
  border-right: 3px solid #accde5;
  margin: 1.5rem 0;
  padding-right: 1rem;
}

.tiptap hr {
  border-top: 1px solid #1084d6;
  margin: 2rem 0;
}

/* TableCategory.module.scss */
.table-category-wrapper {
  background-color: white;
  border-radius: 0.75rem;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  width: 90%;
  margin: auto;
}

.table-category {
  width: 100%;
  font-size: 14px;
  color: #374151;
}

.table-category-header {
  background-color: #f3f4f6;
  text-align: center;
}
```

</details>

## <a name="links">🔗 Assets</a>

Assets used in the project can be found [here](https://Emdaportfolio.com)
