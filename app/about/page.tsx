import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        {/* HERO */}
        <section className="mb-20">
          <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
            About Softavionix
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-black md:text-6xl">
            Premium digital software products — secure checkout, fast email
            delivery, clear policies.
          </h1>

          <div className="mt-8 text-lg text-[#4a4a4a]">
            <p className="font-medium">Softavionix</p>
            <p className="mt-2">
              Digital Software Marketplace
            </p>

            <p className="mt-4 text-base text-[#6b7280]">
              Instant email delivery • Worldwide activation • Human support
            </p>

            <p className="mt-3 text-base text-[#6b7280]">
              ⚡ Fast delivery &nbsp;&nbsp; 🔒 Secure checkout &nbsp;&nbsp; 🌍 Global use
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Shop Digital Products →
            </Link>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            What We Do
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f3f3f]">
            Softavionix provides digital software licenses and subscriptions
            delivered electronically via email. No physical shipping — just fast,
            reliable access with clear product details and support when needed.
          </p>
        </section>

        {/* WHAT WE OFFER */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            What We Offer
          </h2>

          <p className="mt-3 text-[#6b7280]">
            What you can expect every time
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Digital products only",
                desc: "Delivered by email after purchase",
                icon: "📦",
              },
              {
                title: "Fast delivery",
                desc: "Usually within minutes",
                icon: "⚡",
              },
              {
                title: "Worldwide activation",
                desc: "Unless stated otherwise",
                icon: "🌍",
              },
              {
                title: "Secure checkout",
                desc: "Trusted payment providers",
                icon: "🔐",
              },
              {
                title: "Clear descriptions",
                desc: "Compatibility shown upfront",
                icon: "🧾",
              },
              {
                title: "Human support",
                desc: "Help with activation issues",
                icon: "💬",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm"
              >
                <div className="text-2xl">{item.icon}</div>

                <h3 className="mt-4 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-[#6b7280]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DELIVERY */}
        <section className="mb-20">
          <div className="rounded-3xl border border-[#d6e7f2] bg-[#edf7fc] px-8 py-10">
            <h2 className="text-3xl font-semibold tracking-tight">
              How Delivery Works
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f3f3f]">
              After checkout, your digital product is delivered electronically to
              your email. If you don’t see it, check spam or junk folders and
              ensure your email address was entered correctly.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Delivered by email",
                "No physical goods",
                "Check spam / junk",
                "Keep order details",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#e5e5e5] bg-white px-4 py-4 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POLICIES */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Customer Care & Policies
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f3f3f]">
            If something doesn’t work as expected, we’ll help troubleshoot or
            provide a replacement where applicable. Refunds apply only under
            specific conditions outlined in our policies.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/policies/refund-policy"
              className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Refund Policy
              </h3>

              <p className="mt-2 text-sm text-[#6b7280]">
                Eligibility & conditions
              </p>
            </Link>

            <Link
              href="/policies/terms-of-service"
              className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Terms & Conditions
              </h3>

              <p className="mt-2 text-sm text-[#6b7280]">
                Usage & restrictions
              </p>
            </Link>

            <Link
              href="/policies/privacy-policy"
              className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Privacy Policy
              </h3>

              <p className="mt-2 text-sm text-[#6b7280]">
                How data is handled
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}