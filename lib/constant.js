import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";

export const share = [
  {
    title: "facebook",
    url: "https://www.facebook.com/sharer.php?u=",
    icon: <BsFacebook />,
  },
  {
    title: "whatsapp",
    url: "https://api.whatsapp.com/send?text=",
    icon: <BsWhatsapp />,
  },
  {
    title: "linkedin",
    url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: <BsLinkedin />,
  },
  {
    title: "twiter",
    url: "https://twitter.com/share?url=",
    icon: <BsTwitter />,
  },
];

export const siteInfo = {
  firstName: "Zen",
  lastName: "Blog",
  fullName: "Zen Blog",
  url: "https://zenblog.vercel.app",
  description:
    "a minimal blog site built with NextJS and in the backend powered by GraphCMS. developed by tonmoydeb404.",
  ogImage: "/images/OGIMAGE.jpg",
  keywords:
    "javascript, next js, react js, graphcms, tonmoydeb404, tonmoy deb, frontend development, blog, nextjs blog, zenblog",
  color: "#2FAE5E",
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

export const postPerPage = 10;
