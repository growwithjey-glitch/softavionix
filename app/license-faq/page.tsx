import Link from "next/link";

export default function LicenseFaqPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
        <header className="mb-16">
          <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
            License FAQ
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-black md:text-6xl">
            Frequently Asked Questions
          </h1>

          <div className="mt-8 rounded-3xl border border-[#cfe4d2] bg-[#edf7ee] px-6 py-6 md:px-8">
            <p className="text-lg leading-8 text-[#2f2f2f]">
              <span className="mr-2 font-semibold">✓</span>
              All licenses are verified &amp; tested and delivered with
              activation instructions.
            </p>
          </div>
        </header>

        <div className="space-y-14">
          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              About Our Licenses
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  Are the licenses you sell genuine?
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  Yes. All products sold on SoftAvionix include digital license
                  keys that are tested before delivery and provided with clear
                  activation instructions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  Where do your licenses come from?
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  Our licenses are sourced from regional suppliers and surplus
                  inventory channels. This allows us to offer competitive
                  pricing while ensuring keys are valid and functional.
                </p>
                <p className="mt-3 text-lg font-medium leading-8 text-[#2f2f2f]">
                  We do not sell cracked software, pirated products, or illegal
                  activations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  Are these licenses legal to use?
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  Yes. The licenses we sell are legitimate digital keys and are
                  intended for personal or business use as described on each
                  product page.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Pricing
            </h2>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#2f2f2f]">
                Why are your prices lower than official websites?
              </h3>
              <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                Prices may be lower due to:
              </p>

              <div className="mt-5 rounded-3xl border border-[#e5e5e5] bg-white px-6 py-7">
                <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                  <li>Regional pricing differences</li>
                  <li>Bulk purchasing</li>
                  <li>Promotional or surplus inventory</li>
                  <li>Reduced overhead compared to traditional retailers</li>
                </ul>
              </div>

              <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
                This does not affect license validity or functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Delivery &amp; Activation
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  How will I receive my license?
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  Your license key will be delivered by email after payment
                  confirmation. You will also receive step-by-step activation
                  instructions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  What if my license doesn&apos;t work?
                </h3>

                <div className="mt-5 rounded-3xl border border-[#d6e7f2] bg-[#edf7fc] px-6 py-7 md:px-8">
                  <p className="text-xl font-semibold text-[#2f2f2f]">
                    14-Day Guarantee
                  </p>
                  <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
                    If your key:
                  </p>
                  <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                    <li>Does not activate</li>
                    <li>Is invalid</li>
                  </ul>
                  <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
                    We will replace the key or issue a refund according to your
                    preference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Refunds
            </h2>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#2f2f2f]">
                When can I get a refund?
              </h3>
              <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                We offer refunds in the following circumstances:
              </p>

              <div className="mt-5 rounded-3xl border border-[#cfe4d2] bg-[#edf7ee] px-6 py-7">
                <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                  <li>
                    Non-delivery: If you did not receive your license key within
                    24 hours of purchase
                  </li>
                  <li>
                    Invalid license key: If the license key provided is invalid
                    or does not activate properly
                  </li>
                  <li>
                    Wrong product: If you received a different product than what
                    you ordered
                  </li>
                  <li>
                    Duplicate purchase: If you accidentally purchased the same
                    product multiple times
                  </li>
                  <li>
                    Technical issues: If the software is incompatible with your
                    system despite meeting stated requirements
                  </li>
                </ul>
              </div>

              <div className="mt-5 rounded-3xl border border-[#eadcae] bg-[#fbf3d7] px-6 py-7">
                <p className="text-lg font-medium leading-8 text-[#3f3f3f]">
                  Refund Request Timeline
                </p>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  All refund requests must be submitted within 14 days of
                  purchase. Requests made after this period will not be
                  considered.
                </p>
              </div>

              <div className="mt-5 rounded-3xl border border-[#eccfd0] bg-[#fbefef] px-6 py-7">
                <p className="text-lg font-medium leading-8 text-[#2f2f2f]">
                  Non-Refundable Situations
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                  <li>Change of mind after the license key has been revealed</li>
                  <li>
                    Failure to read product description or system requirements
                  </li>
                  <li>
                    Purchasing the wrong product version, so please verify
                    before purchase
                  </li>
                  <li>
                    Issues caused by user error or misuse of the software
                  </li>
                  <li>After the license key has been successfully activated</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Updates &amp; Features
            </h2>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#2f2f2f]">
                Do your licenses include updates?
              </h3>
              <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                This depends on the product:
              </p>

              <div className="mt-5 rounded-3xl border border-[#e5e5e5] bg-white px-6 py-7">
                <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                  <li>
                    Lifetime licenses include updates as allowed by the software
                    publisher
                  </li>
                  <li>
                    Subscription licenses are valid for the stated duration only
                  </li>
                </ul>
              </div>

              <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
                Product details clearly specify what is included.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Account &amp; Support
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#2f2f2f]">
                  Do I need to create an account?
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                  No account is required. Simply purchase and receive your
                  license by email.
                </p>
              </div>

              <div className="rounded-[28px] bg-gradient-to-r from-sky-500 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="rounded-3xl bg-white px-6 py-8 text-center">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                    Customer Support
                  </p>

                  <p className="mt-4 text-lg text-[#4a4a4a]">
                    Email help within 24 hours (usually faster)
                  </p>

                  <p className="mt-4 break-words text-2xl font-semibold text-[#2f2f2f]">
                    support@softavionix.com
                  </p>

                  <p className="mt-5 text-lg leading-8 text-[#4a4a4a]">
                    Have more questions? Contact us at
                    <span className="ml-1 font-medium text-[#2f2f2f]">
                      support@softavionix.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-3xl border border-[#e5e5e5] bg-white px-6 py-7">
              <p className="text-lg leading-8 text-[#3f3f3f]">
                You can also review our{" "}
                <Link
                  href="/policies/refund-policy"
                  className="font-medium underline"
                >
                  Refund Policy
                </Link>
                ,{" "}
                <Link
                  href="/policies/terms-of-service"
                  className="font-medium underline"
                >
                  Terms &amp; Conditions
                </Link>
                , and{" "}
                <Link
                  href="/policies/privacy-policy"
                  className="font-medium underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}