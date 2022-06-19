import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";

export const share = [
  {
    title: "facebook",
    url: "",
    icon: <BsFacebook />,
  },
  {
    title: "whatsapp",
    url: "",
    icon: <BsWhatsapp />,
  },
  {
    title: "linkedin",
    url: "",
    icon: <BsLinkedin />,
  },
  {
    title: "twiter",
    url: "",
    icon: <BsTwitter />,
  },
];

export const siteInfo = {
  firstName: "Zen",
  lastName: "Blog",
  fullName: "Zen Blog",
  url: "https://zenblog.tonmoydeb.com",
  description:
    "a minimal blog site built with NextJS and in the backend powered by GraphCMS. developed by tonmoydeb404.",
  ogImage: "/images/OGIMAGE.jpg",
  keywords:
    "javascript, next js, react js, graphcms, tonmoydeb404, tonmoy deb, frontend development, blog, nextjs blog, zenblog",
};

export const siteNav = [
  {
    id: "01",
    title: "Home",
    url: "/",
    newTab: false,
  },
  {
    id: "02",
    title: "Developer",
    url: "https://tonmoydeb.com",
    newTab: true,
  },
  {
    id: "03",
    title: "Source Code",
    url: "https://github.com/tonmoydeb404/zen-blog",
    newTab: true,
  },
];

export const defaultTheme = "dark";
