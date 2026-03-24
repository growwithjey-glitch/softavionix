export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "microsoft-office-2024-ltsc-professional-plus-pc-global",
    name: "Microsoft Office 2024 LTSC Professional Plus (PC) – Global License Key",
    price: 49.99,
    image: "/products/office-2024.jpg",
    shortDescription: "One-time purchase for PC with global delivery.",
    description:
      "Professional Office software license delivered by email after successful order verification.",
    featured: true,
  },
  {
    id: "2",
    slug: "spotify-premium-12-month-subscription-global",
    name: "Spotify Premium – 12-Month Subscription (Spotify Account, Global Access)",
    price: 39.99,
    image: "/products/spotify-12m.jpg",
    shortDescription: "12-month Spotify Premium access.",
    description:
      "Digital subscription product delivered manually after payment confirmation.",
  },
  {
    id: "3",
    slug: "amazon-prime-video-6-month-subscription-global",
    name: "Amazon Prime Video – 6-Month Subscription (Amazon Account, Global Access)",
    price: 29.99,
    image: "/products/prime-video-6m.jpg",
    shortDescription: "6 months of Prime Video access.",
    description:
      "Digital subscription fulfilled manually by email after successful payment.",
  },
];