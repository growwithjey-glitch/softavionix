import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <section className="mb-20">
          <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
            Contact Us
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-black md:text-6xl">
            Have questions or need assistance? Our support team is here to help.
          </h1>
        </section>

        <section className="mb-20">
          <div className="rounded-[28px] bg-gradient-to-r from-sky-500 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="rounded-3xl bg-white px-6 py-8 text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                Support
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#2f2f2f]">
                Email Support
              </h2>

              <p className="mt-3 text-lg text-[#4a4a4a]">
                Response within 24 hours (usually faster)
              </p>

              <p className="mt-6 break-words text-2xl font-semibold text-[#2f2f2f] md:text-3xl">
                support@softavionix.com
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
            We Assist With
          </h2>
          <p className="mt-3 text-[#6b7280]">
            Common questions we solve daily
          </p>

          <div className="mt-6 rounded-3xl border border-[#d6e7f2] bg-[#edf7fc] px-6 py-7 md:px-8">
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
              <li>License delivery questions</li>
              <li>Activation or access issues</li>
              <li>Order-related inquiries</li>
              <li>Product compatibility</li>
            </ul>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
            What to Include in Your Message
          </h2>
          <p className="mt-3 text-[#6b7280]">
            Helps us respond faster and accurately
          </p>

          <div className="mt-6 rounded-3xl border border-[#cfe4d2] bg-[#edf7ee] px-6 py-7 md:px-8">
            <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
              <li>Order number, if applicable</li>
              <li>Email used at checkout</li>
              <li>Product name</li>
              <li>Description of the issue</li>
              <li>Screenshots or error message</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
            Helpful Resources
          </h2>
          <p className="mt-3 text-[#6b7280]">
            Quick links to important policies
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/policies/refund-policy"
              className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#2f2f2f]">
                Refund Policy
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">
                Refund eligibility details
              </p>
            </Link>

            <Link
              href="/policies/terms-of-service"
              className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#2f2f2f]">
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
              <h3 className="text-lg font-semibold text-[#2f2f2f]">
                Privacy Policy
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">
                How your data is handled
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}