"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Gamepad2,
  Monitor,
  Repeat,
  Gift,
  Trophy,
  Tag,
  X,
  User,
  Heart,
  ShoppingCart,
  Menu,
  Search,
} from "lucide-react";
import MarketplaceSearchBar from "./MarketplaceSearchBar";

const navItems = [
  { label: "Gaming", href: "/products", icon: Gamepad2 },
  { label: "Software", href: "/products", icon: Monitor },
  { label: "Subscriptions", href: "/products", icon: Repeat },
  { label: "Gift Cards", href: "/products", icon: Gift },
  { label: "Top Deals", href: "/products", icon: Trophy },
  { label: "Outlet", href: "/products", icon: Tag, hot: true },
];

const mobileLinks = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "License FAQ", href: "/license-faq" },
  { label: "Contact", href: "/policies/contact" },
];

export default function Header() {
  const [showPromo, setShowPromo] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.18)]" : ""
      }`}
    >
      {showPromo && (
        <div className="bg-[#283a7a] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="w-8 shrink-0" />
            <div className="flex-1 text-center">
              <p className="text-sm font-semibold">First app purchase?</p>
              <p className="text-sm text-white/90">
                Save 15% with the APP15 code
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPromo(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Dismiss promotion"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="border-b border-white/10 bg-black text-white">
        {/* Desktop header */}
        <div className="mx-auto hidden max-w-7xl items-center gap-4 px-6 py-5 lg:flex md:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Softavionix home"
          >
            <Image
              src="/brand/softavionix-logo.png"
              alt="Softavionix"
              width={44}
              height={44}
              priority
              className="h-11 w-auto"
            />
            <span className="text-2xl font-extrabold tracking-tight text-white">
              SOFTAVIONIX
            </span>
          </Link>

          <div className="flex-1">
            <MarketplaceSearchBar />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              EN / USD
            </button>

            <Link
              href="/about"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="About"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/license-faq"
              className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              FAQ
            </Link>

            <Link
              href="/products"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Softavionix home"
            >
              <Image
                src="/brand/softavionix-logo.png"
                alt="Softavionix"
                width={36}
                height={36}
                priority
                className="h-9 w-auto"
              />
              <span className="text-xl font-extrabold tracking-tight text-white">
                SOFTAVIONIX
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/cart"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile search panel */}
        {mobileSearchOpen && (
          <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
            <MarketplaceSearchBar />
          </div>
        )}

        {/* Desktop nav row */}
        <div className="hidden border-t border-white/10 lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-6 py-4 text-sm font-semibold text-white/90 md:px-8">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 whitespace-nowrap transition hover:text-blue-400"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.hot && (
                    <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Hot
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/products"
              className="ml-auto whitespace-nowrap text-violet-400 transition hover:text-violet-300"
            >
              Pay less with Softavionix Plus
            </Link>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#05070c] lg:hidden">
            <div className="px-4 py-4">
              <div className="grid gap-2">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Browse
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <button className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  EN / USD
                </button>

                <Link
                  href="/license-faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}