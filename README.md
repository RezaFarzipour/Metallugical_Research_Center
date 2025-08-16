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
4. 📂 [Project-structure](#project-structure)
5. 🕸️ [Code to Copy](#snippets)
6. 🔗 [Assets](#links)

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

👉 **Secure OTP Authentication** Seamless login and sign-up using phone numbers with OTP verification for enhanced security.

👉 **Captivating Landing Page** A visually appealing landing page designed to engage users with modern UI elements powered by Hero UI.

👉 **Admin Panel**
Course & Blog Management: Add and manage educational courses and blogs (news and tutorials) using Tiptap for rich text editing.

Interactive Reservation System: Manage metallurgy testing equipment reservations with a dynamic, ping-pong-style interaction for real-time coordination and availability updates.

Reporting: Generate detailed reports for operational insights.

Service Management: Add and configure metallurgy services offered on the platform.

👉 **User Panel**
Interactive Reservation System: User-friendly interface for clients to reserve testing equipment with real-time, ping-pong-style coordination and updates.

Reporting: Access personalized reports for reservation history and service usage.

👉 **Responsive Design** Fully optimized for mobile, tablet, and desktop devices, ensuring a consistent and seamless experience.

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

## <a name="Project-structure">📂 Project Structure</a>



````ts
src_extracted/
├── app/
│   ├── actions/
│   │   └── getCurrentUser.ts
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── register/
│   │       └── route.ts
│   ├── components/
│   │   ├── Avatar.tsx
│   │   ├── CategoryBox.tsx
│   │   ├── Container.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Heading.tsx
│   │   ├── Modals/
│   │   │   ├── LoginModal.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── RegisterModal.tsx
│   │   │   └── index.ts
│   │   ├── Navbar/
│   │   │   ├── Categories.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Search.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── inputs/
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   └── Input.tsx
│   │   └── providers/
│   │       └── ToasterProvider.tsx
│   ├── hooks/
│   │   ├── useLoginModal.ts
│   │   ├── useRegisterModal.ts
│   │   └── useRentModal.ts
│   ├── layout.tsx
│   └── page.tsx
├── libs/
│   └── prisma.ts
├── pages/
│   └── api/
│       └── example.ts
├── styles/
│   └── globals.css

````


## <a name="links">🔗 Assets</a>

Assets used in the project can be found [here](https://Emdaportfolio.com)
