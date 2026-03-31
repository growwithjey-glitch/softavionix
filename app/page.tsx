import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import {
  MonitorSmartphone,
  FileText,
  Shield,
  Globe,
  Repeat,
  Clapperboard,
  Laptop,
  Brain,
} from "lucide-react";

const categories = [
  {
    name: "Windows",
    icon: MonitorSmartphone,
    href: "/products?category=Operating%20Systems",
    tileClass:
      "hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(59,130,246,0.18)]",
    iconWrapClass: "bg-blue-50 text-blue-700",
  },
  {
    name: "Office",
    icon: FileText,
    href: "/products?category=Office%20Tools",
    tileClass:
      "hover:border-indigo-200 hover:shadow-[0_12px_30px_rgba(99,102,241,0.18)]",
    iconWrapClass: "bg-indigo-50 text-indigo-700",
  },
  {
    name: "Security",
    icon: Shield,
    href: "/products?category=Security",
    tileClass:
      "hover:border-green-200 hover:shadow-[0_12px_30px_rgba(34,197,94,0.18)]",
    iconWrapClass: "bg-green-50 text-green-700",
  },
  {
    name: "VPN",
    icon: Globe,
    href: "/products?category=Security",
    tileClass:
      "hover:border-cyan-200 hover:shadow-[0_12px_30px_rgba(6,182,212,0.18)]",
    iconWrapClass: "bg-cyan-50 text-cyan-700",
  },
  {
    name: "Subscriptions",
    icon: Repeat,
    href: "/products?category=Subscriptions",
    tileClass:
      "hover:border-violet-200 hover:shadow-[0_12px_30px_rgba(139,92,246,0.18)]",
    iconWrapClass: "bg-violet-50 text-violet-700",
  },
  {
    name: "Streaming",
    icon: Clapperboard,
    href: "/products?category=Streaming%20Services",
    tileClass:
      "hover:border-rose-200 hover:shadow-[0_12px_30px_rgba(244,63,94,0.18)]",
    iconWrapClass: "bg-rose-50 text-rose-700",
  },
  {
    name: "Software",
    icon: Laptop,
    href: "/products",
    tileClass:
      "hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(71,85,105,0.16)]",
    iconWrapClass: "bg-slate-100 text-slate-700",
  },
  {
    name: "AI Tools",
    icon: Brain,
    href: "/products?category=Subscriptions",
    tileClass:
      "hover:border-fuchsia-200 hover:shadow-[0_12px_30px_rgba(217,70,239,0.18)]",
    iconWrapClass: "bg-fuchsia-50 text-fuchsia-700",
  },
];

const reviews = [
  {
    quote:
      "Received my license key within minutes. Activated perfectly with no issues.",
    name: "Daniel R.",
    location: "Canada",
    tone: "border-green-100 bg-green-50",
  },
  {
    quote:
      "Everything worked exactly as described. Clear delivery and great support.",
    name: "Ahmed K.",
    location: "UAE",
    tone: "border-slate-200 bg-slate-100",
  },
  {
    quote:
      "Best price I found online. Fast email delivery and easy activation.",
    name: "Sofia M.",
    location: "Spain",
    tone: "border-amber-100 bg-amber-50",
  },
];

const faqs = [
  "Are licenses genuine?",
  "How will I receive my order?",
  "Are these digital products only?",
  "What if activation does not work?",
  "Do you offer support?",
  "Can I read your refund policy first?",
];

export default function HomePage() {
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      {/* Promo Bar */}
      <section className="bg-[#1f2f6b] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-3 text-center text-sm font-medium md:px-8">
          First order? Secure checkout • Fast email delivery • Global activation
        </div>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-8 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
          {/* Main Banner */}
          <div className="relative min-h-[460px] overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.35),transparent_28%),linear-gradient(135deg,#0f172a_0%,#020617_40%,#1e293b_100%)]" />

            <div className="relative z-10 grid h-full lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col justify-center px-8 py-10 text-white md:px-12">
                <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                  Softavionix
                </p>

                <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
                  Digital software,
                  <br />
                  license keys &
                  <br />
                  subscriptions
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                  Secure checkout, fast email delivery, and global activation —
                  with support when you need it.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Shop Products →
                  </Link>

                  <Link
                    href="/license-faq"
                    className="inline-flex items-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    License FAQ
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-white/80">
                  <span>🔒 Secure checkout</span>
                  <span>•</span>
                  <span>⚡ Fast email delivery</span>
                  <span>•</span>
                  <span>🌍 Worldwide activation</span>
                </div>
              </div>

           <div className="hidden lg:block" />
            </div>
          </div>

          {/* Side Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {/* Bestseller Card */}
            <Link
              href="/products/windows-11-pro"
              className="group relative min-h-[217px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#111827,#1e3a8a)]" />

              <div className="relative z-10 grid h-full grid-cols-[1.1fr_0.9fr] items-center gap-4 p-6 text-white">
                <div>
                  <span className="inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Bestseller
                  </span>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight">
                    Windows 11 Pro
                  </h2>

                  <p className="mt-2 text-sm text-white/80">
                    Microsoft • Global • Digital delivery
                  </p>

                  <span className="mt-6 inline-block text-sm font-semibold text-blue-300 transition group-hover:translate-x-1">
                    Explore deal →
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="rounded-[22px] border border-white/10 bg-white/10 p-3">
                    <div className="rounded-[16px] bg-white p-3 shadow-lg">
                      <Image
                        src="/products/windows11.png"
                        alt="Windows 11 Pro"
                        width={420}
                        height={520}
                        priority
                        className="h-auto w-full max-w-[160px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Popular Card */}
            <Link
              href="/products"
              className="group relative min-h-[217px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a,#14532d)]" />

              <div className="relative z-10 grid h-full grid-cols-[1.1fr_0.9fr] items-center gap-4 p-6 text-white">
                <div>
                  <span className="inline-flex rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Popular
                  </span>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight">
                    Software & Subscription Deals
                  </h2>

                  <p className="mt-2 text-sm text-white/80">
                    Verified products with fast email fulfillment
                  </p>

                  <span className="mt-6 inline-block text-sm font-semibold text-emerald-300 transition group-hover:translate-x-1">
                    Browse offers →
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="rounded-[22px] border border-white/10 bg-white/10 p-3">
                    <div className="rounded-[16px] bg-white p-3 shadow-lg">
                      <Image
                        src="/products/office365.png"
                        alt="Software Deals"
                        width={420}
                        height={520}
                        className="h-auto w-full max-w-[150px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
{/* Categories */}
<section className="mx-auto max-w-7xl px-6 py-4 md:px-8">
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
    {categories.map((category) => {
      const Icon = category.icon;

      return (
        <Link
          key={category.name}
          href={category.href}
          className={`group rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition duration-200 hover:-translate-y-1 ${category.tileClass}`}
        >
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl transition duration-200 group-hover:scale-110 ${category.iconWrapClass}`}
          >
            <Icon className="h-6 w-6" />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-800">
            {category.name}
          </p>
        </Link>
      );
    })}
  </div>
</section>



      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            🚀 Fast Email Delivery
          </div>
          <div className="rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
            🔒 Secure Checkout
          </div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            🌍 Global Activation
          </div>
          <div className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            ✓ Verified / Tested
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-black">
              Bestsellers
            </h2>
            <p className="mt-3 text-base text-[#5b5b5b]">
              Featured digital products currently popular with customers.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:inline-flex"
          >
            Discover all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Discover all
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-black">
              How It Works
            </h2>
            <p className="mt-3 text-base text-[#5b5b5b]">
              A simple digital purchase flow from checkout to activation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f7f6f1] p-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Step 1
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Purchase
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                Choose your digital product and complete checkout securely.
              </p>
            </div>

            <div className="rounded-3xl bg-blue-50 p-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Step 2
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Receive Access Details
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                Your order information is sent by email with the required
                details.
              </p>
            </div>

            <div className="rounded-3xl bg-amber-50 p-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                Step 3
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Activate Easily
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                Follow the included instructions to activate or access your
                product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-black">
            Trusted by Customers Worldwide
          </h2>
          <p className="mt-3 text-base text-[#6b7280]">
            Based on feedback from recent buyers
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className={`rounded-3xl border p-6 shadow-sm ${review.tone}`}
            >
              <div className="text-2xl text-amber-500">★★★★★</div>
              <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
                “{review.quote}”
              </p>
              <p className="mt-5 text-lg font-semibold text-[#4a4a4a]">
                — {review.name},{" "}
                <span className="font-normal text-[#6b7280]">
                  {review.location}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-center text-lg font-medium text-[#2f2f2f]">
          🛡️ Buyer Protection — Replacement or refund where applicable
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-black">
            FAQ
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const tones = [
              "border-green-100 bg-green-50",
              "border-slate-200 bg-slate-100",
              "border-amber-100 bg-amber-50",
              "border-fuchsia-100 bg-fuchsia-50",
            ];
            const tone = tones[index % tones.length];

            return (
              <div
                key={faq}
                className={`flex items-center justify-between rounded-3xl border px-6 py-6 shadow-sm ${tone}`}
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl shadow-sm">
                    ✔
                  </div>
                  <p className="text-xl font-medium text-[#2f2f2f] md:text-2xl">
                    {faq}
                  </p>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg text-[#6b7280] shadow-sm">
                  ˅
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-xl">
                👩‍💼
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2f2f2f]">
                  Real Human Support
                </p>
                <p className="text-lg text-[#5b5b5b]">
                  We reply within 24 hours, usually faster
                </p>
              </div>
            </div>

            <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-[#2f2f2f]">
              📧 support@softavionix.com
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-sky-600 to-blue-700 p-8 text-white shadow-[0_16px_50px_rgba(0,0,0,0.14)] md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.18em] text-white/75">
              Ready to browse?
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Explore digital software and subscription deals
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/85">
              View products, compare options, and buy with secure checkout and
              fast email delivery.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Browse Products
              </Link>
              <Link
                href="/policies/contact"
                className="rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}