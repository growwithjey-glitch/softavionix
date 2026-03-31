import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
        {/* Header */}

        <header className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight text-black md:text-6xl">
            Terms and Conditions
          </h1>

          <p className="mt-4 text-base text-[#6d6d6d]">
            Last Updated: January 27, 2026
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            By accessing and using our website or purchasing our products,
            you agree to be bound by these Terms and Conditions.
          </p>
        </header>

        <div className="space-y-14">

          {/* Important Notice */}

          <section className="rounded-3xl border border-[#e7dcc0] bg-[#fdf6df] px-6 py-7 md:px-8">
            <h2 className="text-2xl font-semibold">
              Important Notice
            </h2>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              All products sold on Softavionix are digital products delivered
              electronically via email. No physical items are shipped.
            </p>
          </section>

          {/* Acceptance */}

          <section>
            <h2 className="text-[2rem] font-medium">
              1. Acceptance of Terms
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              By accessing this website and making a purchase, you agree to
              these Terms and Conditions and our Privacy Policy.
              If you do not agree, please do not use our website or purchase
              our products.
            </p>
          </section>

          {/* Products */}

          <section>
            <h2 className="text-[2rem] font-medium">
              2. Products and Services
            </h2>

            <h3 className="mt-6 text-xl font-semibold">
              Digital Products
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              All products sold on Softavionix are digital software products
              delivered electronically. We do not sell or ship physical items.
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Product Descriptions
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              We make reasonable efforts to ensure product descriptions,
              specifications, and compatibility information are accurate.
              However, we do not guarantee that all content is error-free,
              complete, or current.
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Digital License Information
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              All digital products provided are intended to function as
              described on the product page and include activation or access
              instructions where applicable.
            </p>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f] font-medium">
              We do not sell cracked software, pirated products, or illegal
              activations.
            </p>
          </section>

          {/* Purchasing */}

          <section>
            <h2 className="text-[2rem] font-medium">
              3. Purchasing and Payment
            </h2>

            <h3 className="mt-6 text-xl font-semibold">
              Pricing
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              All prices are listed in USD and may change without notice.
              The price charged is the price shown at the time of purchase.
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Payment Methods
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              Payments are processed through secure, encrypted payment
              providers. We do not store payment details on our servers.
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              Order Confirmation
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              After purchase, you will receive an order confirmation email
              containing delivery or activation details.
            </p>
          </section>

          {/* Delivery */}

          <section>
            <h2 className="text-[2rem] font-medium">
              4. Digital Delivery and Activation
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>
                Digital products are delivered electronically via email
                after payment confirmation.
              </li>

              <li>
                Activation methods vary by product and are subject to the
                software publisher's terms.
              </li>

              <li>
                Activation and availability may vary depending on regional
                restrictions.
              </li>
            </ul>
          </section>

          {/* License Restrictions */}

          <section>
            <h2 className="text-[2rem] font-medium">
              5. License Usage and Restrictions
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Digital products are licensed for use in accordance with the
              product description and the publisher's terms.
            </p>

            <div className="mt-5 rounded-3xl border border-[#eccfd0] bg-[#fbefef] px-6 py-7">
              <p className="font-medium text-lg">
                You may not:
              </p>

              <ul className="mt-3 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
                <li>Resell, redistribute, or share digital products</li>
                <li>Use products for unauthorized commercial resale</li>
                <li>Attempt to reverse engineer or bypass protections</li>
                <li>Use products in violation of applicable laws</li>
              </ul>
            </div>
          </section>

          {/* Refunds */}

          <section>
            <h2 className="text-[2rem] font-medium">
              6. Refunds and Disputes
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Refunds are governed strictly by our Refund Policy.
            </p>

            <Link
              href="/policies/refund-policy"
              className="inline-block mt-4 text-sm font-medium text-slate-900 underline"
            >
              View Refund Policy →
            </Link>

            <p className="mt-6 text-lg leading-8 text-[#3f3f3f]">
              Customers agree to contact our support team before initiating
              a payment dispute.
            </p>
          </section>

          {/* Intellectual Property */}

          <section>
            <h2 className="text-[2rem] font-medium">
              7. Intellectual Property
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              All software remains the property of its respective publishers.
              Customers purchase a license to use the software, not ownership.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              All website content is protected by applicable intellectual
              property laws.
            </p>
          </section>

          {/* Support */}

          <section>
            <div className="rounded-[28px] bg-gradient-to-r from-sky-500 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="rounded-3xl bg-white px-6 py-8 text-center">

                <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                  Customer Support
                </p>

                <p className="mt-4 text-2xl font-semibold break-words">
                  support@softavionix.com
                </p>

                <p className="mt-3 text-lg text-[#4a4a4a]">
                  Response time: within 24 hours
                </p>

              </div>
            </div>
          </section>

          {/* Agreement */}

          <section>
            <div className="mt-10 border-t border-[#ddd7ca] pt-8">
              <p className="text-lg italic leading-8 text-[#5b5b5b]">
                By purchasing from Softavionix, you confirm that you have
                read, understood, and agree to these Terms and Conditions.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}