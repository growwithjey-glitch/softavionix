import Link from "next/link";
import Image from "next/image";
import { Mail, ShieldCheck, Globe, CreditCard } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "License FAQ", href: "/license-faq" },
  { label: "Contact Us", href: "/policies/contact" },
];

const legalLinks = [
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Terms & Conditions", href: "/policies/terms-of-service" },
];

const supportItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@softavionix.com",
  },
  {
    icon: ShieldCheck,
    title: "Response",
    value: "Within 24 hours",
  },
  {
    icon: Globe,
    title: "Coverage",
    value: "Worldwide",
  },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Amex", "Shop Pay"];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#05070c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">

        {/* Top grid */}
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-4"
              aria-label="Softavionix home"
            >
              <Image
                src="/brand/softavionix-logo.png"
                alt="Softavionix"
                width={42}
                height={42}
                className="h-10 w-auto"
                priority
              />

              <span className="text-2xl font-bold tracking-tight text-white">
                SOFTAVIONIX
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-8 text-slate-400">
              Your trusted source for digital software licenses,
              subscriptions, and global delivery with secure checkout
              and responsive human support.
            </p>

            {/* Social */}
            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    rounded-full
                    border border-slate-700
                    bg-slate-900
                    px-4 py-2
                    text-sm font-medium
                    text-slate-300
                    transition
                    hover:border-slate-500
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      text-slate-400
                      transition
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Legal
            </h3>

            <ul className="mt-6 space-y-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      text-slate-400
                      transition
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Support
            </h3>

            <div className="mt-6 space-y-5">
              {supportItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >
                    <div className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      bg-slate-900
                      border border-slate-800
                    ">
                      <Icon className="h-4 w-4 text-slate-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-400">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-slate-800 pt-10">

          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <CreditCard className="h-4 w-4" />
              Accepted payment methods
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="
                    rounded-xl
                    border border-slate-700
                    bg-white
                    px-5 py-3
                    text-sm font-semibold
                    text-slate-900
                    shadow-sm
                  "
                >
                  {method}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-8">

          <div className="
            flex flex-col gap-4
            text-center
            text-sm text-slate-500
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:text-left
          ">

            <div>
              © 2026 Softavionix. All rights reserved.
              <div className="mt-2 text-slate-600">
                Digital products delivered electronically.
                No physical shipping.
              </div>
            </div>

            <div>
              Secure checkout • Global activation • Support available
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}