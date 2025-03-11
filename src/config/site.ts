export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "متالوژی ریسرچ سنتر",
  description: "آزمایشگاه متالوژی ریسرچ سنتر",
  navItems: [
    {
      id: 1,
      label: "خانه",
      path: "/",
    },
    {
      id: 2,
      label: "خدمات",
      path: "/services",
    },
    {
      id: 3,
      label: "درباره ما",
      path: "/aboutus",
    },
    {
      id: 4,
      label: "ارتباط با ما ",
      path: "/contactus",
    },

  ],
  navMenuItems: [
    {
      label: "Profile",
      path: "/profile",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Team",
      path: "/team",
    },
    {
      label: "Calendar",
      path: "/calendar",
    },
    {
      label: "Settings",
      path: "/settings",
    },
    {
      label: "Help & Feedback",
      path: "/help-feedback",
    },
    {
      label: "Logout",
      path: "/logout",
    },
  ],
  links: {
    telegram: "https://heroui.com",
    whatsapp: "https://discord.gg/9b6yyZKmH4",
    eita: "https://patreon.com/jrgarciadev",
    bale: "https://patreon.com/jrgarciadev",
  },
};
