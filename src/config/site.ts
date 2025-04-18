export type SiteConfig = typeof siteConfig;
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
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

  links: {
    telegram: FaTelegram,
    whatsapp: IoLogoWhatsapp,
    eita: "https://patreon.com/jrgarciadev",
    bale: "https://patreon.com/jrgarciadev",
    instagram: FaInstagram,
  },
};
