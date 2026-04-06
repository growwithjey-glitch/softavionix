export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  shortDescription: string;
  description: string;
  category?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "amazon-prime-video-12-month-subscription-global",
    name: "Amazon Prime Video – 12-Month Subscription (Global)",
    price: 35.99,
    image: "/products/primevideo.png",
    shortDescription: "12-month digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Streaming Services",
    featured: true,
  },
  {
    id: "2",
    slug: "amazon-prime-video-6-month-subscription-global",
    name: "Amazon Prime Video – 6-Month Subscription (Global)",
    price: 28.99,
    image: "/products/amazon-prime-video-6-month.jpg",
    shortDescription: "6-month digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Streaming Services",
  },
  {
    id: "3",
    slug: "avg-secure-vpn-5-devices-1-year",
    name: "AVG Secure VPN – 5 Devices | 1 Year",
    price: 9.99,
    image: "/products/avgvpn.png",
    shortDescription: "VPN protection for up to 5 devices for 1 year.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "4",
    slug: "avg-ultimate-10-devices-1-year",
    name: "AVG Ultimate – 10 Devices | 1 Year",
    price: 21.99,
    image: "/products/avgvpn.png",
    shortDescription: "Security suite for up to 10 devices for 1 year.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "5",
    slug: "avg-ultimate-10-devices-2-years",
    name: "AVG Ultimate – 10 Devices | 2 Years",
    price: 29.99,
    image: "/products/avgvpn.png",
    shortDescription: "Security suite for up to 10 devices for 2 years.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "6",
    slug: "canva-education-2-year-subscription-global",
    name: "Canva Education – 2-Year Subscription (Global)",
    price: 19.99,
    image: "/products/canva-cover.png",
    shortDescription: "2-year digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Subscriptions",
  },
  {
    id: "7",
    slug: "chatgpt-go-1-year-subscription-global",
    name: "ChatGPT Go – 1-Year Subscription (Global)",
    price: 34.99,
    image: "/products/chatgpt-cover.png",
    shortDescription: "1-year digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Subscriptions",
    featured: true,
  },
  {
    id: "8",
    slug: "chatgpt-plus-1-month-subscription-global",
    name: "ChatGPT Plus – 1-Month Subscription (Global)",
    price: 10.99,
    image: "/products/chatgpt-cover.png",
    shortDescription: "1-month digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Subscriptions",
  },
  {
    id: "9",
    slug: "gemini-advanced-12-months-global-account-instant-access",
    name: "Gemini Advanced 12 Months | Global Account | Instant Access",
    price: 34.99,
    image: "/products/gemini-cover.png",
    shortDescription: "12-month digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Subscriptions",
    featured: true,
  },
  {
    id: "10",
    slug: "mcafee-antivirus-1-device-1-year",
    name: "McAfee AntiVirus – 1 Device | 1 Year",
    price: 15.99,
    image: "/products/mcafee1year-cover.png",
    shortDescription: "Antivirus protection for 1 device for 1 year.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "11",
    slug: "mcafee-antivirus-1-device-3-years",
    name: "McAfee AntiVirus – 1 Device | 3 Years",
    price: 24.99,
    image: "/products/mcafee1year-cover.png",
    shortDescription: "Antivirus protection for 1 device for 3 years.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "12",
    slug: "microsoft-office-2024-ltsc-professional-plus-pc-global-license-key",
    name: "Microsoft Office 2024 LTSC Professional Plus (PC) – Global License Key",
    price: 39.99,
    image: "/products/microsoft-office-2024-ltsc-pro-plus.jpg",
    shortDescription: "One-time Office license for PC with global delivery.",
    description:
      "Digital software license delivered electronically after successful order.",
    category: "Office Tools",
    featured: true,
  },
  {
    id: "13",
    slug: "microsoft-office-365-education-5-devices-1-year",
    name: "Microsoft Office 365 Education – 5 Devices | 1 Year",
    price: 15.99,
    image: "/products/office365.png",
    shortDescription: "Office subscription for up to 5 devices for 1 year.",
    description:
      "Digital software access fulfilled electronically after payment confirmation.",
    category: "Office Tools",
  },
  {
    id: "14",
    slug: "norton-360-premium-10-devices-1-year-75gb-cloud",
    name: "Norton 360 Premium – 10 Devices | 1 Year + 75GB Cloud",
    price: 23.99,
    image: "/products/norton-360-premium-10-devices-1-year.jpg",
    shortDescription: "Premium security for 10 devices plus cloud storage.",
    description:
      "Digital security software delivered electronically after successful order.",
    category: "Security",
  },
  {
    id: "15",
    slug: "perplexity-pro-1-year-subscription-global",
    name: "Perplexity Pro – 1-Year Subscription (Global)",
    price: 20.99,
    image: "/products/perplexity-cover.png",
    shortDescription: "1-year digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Subscriptions",
  },
  {
    id: "16",
    slug: "spotify-premium-12-month-subscription-global",
    name: "Spotify Premium – 12-Month Subscription (Global)",
    price: 49.99,
    image: "/products/spotify-cover.png",
    shortDescription: "12-month digital subscription with global access.",
    description:
      "Digital subscription fulfilled by email after payment confirmation.",
    category: "Streaming Services",
    featured: true,
  },
  {
    id: "17",
    slug: "windows-11-pro-perpetual-license",
    name: "Windows 11 Pro – Perpetual License",
    price: 34.99,
    image: "/products/windows11.png",
    shortDescription: "One-time perpetual Windows 11 Pro license.",
    description:
      "Digital operating system license delivered electronically after successful order.",
    category: "Operating Systems",
    featured: true,
  },
  {
    id: "18",
    slug: "windows-server-2025-datacenter-24-core",
    name: "Windows Server 2025 Datacenter – 24 Core",
    price: 24.99,
    image: "/products/windows-server-2025-datacenter-24-core.jpg",
    shortDescription: "Server license for Windows Server 2025 Datacenter.",
    description:
      "Digital server software license delivered electronically after successful order.",
    category: "Operating Systems",
  },
];