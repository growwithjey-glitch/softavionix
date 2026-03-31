export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
        <header className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight text-black md:text-6xl">
            Refund Policy
          </h1>
          <p className="mt-4 text-base text-[#6d6d6d]">
            Last Updated: January 27, 2026
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            This policy explains when refunds may be issued for digital products
            purchased from Softavionix.
          </p>
        </header>

        <div className="space-y-14">
          <section className="rounded-3xl border border-[#e7dcc0] bg-[#fdf6df] px-6 py-7 md:px-8">
            <h2 className="text-2xl font-semibold text-[#2f2f2f]">
              Important Notice
            </h2>
            <div className="mt-4 space-y-3 text-lg leading-8 text-[#3f3f3f]">
              <p>
                All products sold on Softavionix are digital goods delivered
                electronically via email.
              </p>
              <p>No physical items are shipped.</p>
              <p>
                Due to the nature of digital products, items cannot be returned
                once delivered.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Digital Product Policy
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Because license keys and digital accounts are issued
              electronically and are immediately accessible, refunds are limited
              and granted only under the conditions below.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Refund Eligibility
            </h2>
            <div className="mt-5 rounded-3xl border border-[#cfe4d2] bg-[#edf7ee] px-6 py-7 md:px-8">
              <p className="mb-4 text-lg leading-8 text-[#3f3f3f]">
                A refund may be approved if:
              </p>
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                <li>You did not receive your order within 24 hours of purchase</li>
                <li>
                  The product is verifiably invalid or non-functional, and our
                  support team cannot resolve the issue
                </li>
                <li>You received a different product than ordered</li>
                <li>A duplicate purchase is confirmed</li>
                <li>
                  The product cannot be activated due to a defect, not
                  compatibility or region restrictions
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Resolution Priority
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Softavionix reserves the right to first attempt:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
              <li>Troubleshooting</li>
              <li>Replacement</li>
              <li>Re-issuance</li>
            </ul>
            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              before approving a refund.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Non-Refundable Situations
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Refunds will not be issued for:
            </p>
            <div className="mt-5 rounded-3xl border border-[#eccfd0] bg-[#fbefef] px-6 py-7 md:px-8">
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                <li>Successfully delivered and activated products</li>
                <li>Change of mind or no longer needed</li>
                <li>Failure to review product description</li>
                <li>System incompatibility</li>
                <li>Region, country, or publisher restrictions</li>
                <li>Issues caused by user error, misuse, or third-party actions</li>
                <li>
                  Products suspended or banned due to violation of publisher
                  terms
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Compatibility Responsibility
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Customers are responsible for ensuring:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
              <li>Correct version selection</li>
              <li>System compatibility</li>
              <li>Region and platform suitability</li>
            </ul>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Softavionix is not responsible for incompatibility issues clearly
              stated in product descriptions.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Refund Request Timeframe
            </h2>
            <div className="mt-5 rounded-3xl border border-[#eadcae] bg-[#fbf3d7] px-6 py-7 md:px-8">
              <p className="text-lg font-medium leading-8 text-[#3f3f3f]">
                Refund requests must be submitted within 7 days of purchase.
              </p>
              <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                Requests outside this window may not be eligible.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              How to Request a Refund
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Please contact support with:
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
              <li>Order number</li>
              <li>Email used at checkout</li>
              <li>Detailed issue description</li>
              <li>Screenshots or error messages, if applicable</li>
            </ol>

            <div className="mt-8 rounded-[28px] bg-gradient-to-r from-sky-500 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="rounded-3xl bg-white px-6 py-8 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                  Contact Support
                </p>
                <p className="mt-4 text-2xl font-semibold text-[#2f2f2f] break-words">
                  support@softavionix.com
                </p>
                <p className="mt-3 text-lg text-[#4a4a4a]">
                  Response time: within 24 hours
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Refund Processing
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              If approved:
            </p>
            <div className="mt-5 rounded-3xl border border-[#d6e7f2] bg-[#edf7fc] px-6 py-7 md:px-8">
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                <li>Processed within 5–7 business days</li>
                <li>Issued to the original payment method</li>
                <li>Associated license or account may be deactivated</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Fraud & Abuse Protection
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Refunds may be denied if:
            </p>
            <div className="mt-5 rounded-3xl border border-[#eccfd0] bg-[#fbefef] px-6 py-7 md:px-8">
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f] marker:text-[#5a5a5a]">
                <li>Fraudulent activity is suspected</li>
                <li>Product misuse is detected</li>
                <li>Activation or use occurred prior to refund request</li>
                <li>Policy abuse is identified</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="rounded-[28px] bg-gradient-to-r from-emerald-400 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="rounded-3xl bg-white px-6 py-8 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                  Our Commitment
                </p>
                <p className="mt-4 text-2xl leading-9 text-[#2f2f2f]">
                  We are committed to delivering working digital products and
                  providing fair, responsive support.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium tracking-tight text-[#2f2f2f]">
              Policy Updates
            </h2>
            <div className="mt-5 rounded-3xl border border-[#ead8ee] bg-[#f8eef9] px-6 py-7 md:px-8">
              <p className="text-lg leading-8 text-[#3f3f3f]">
                Softavionix reserves the right to modify this policy at any
                time.
              </p>
              <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
                Updates will be reflected on this page.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-[#ddd7ca] pt-10">
          <p className="text-lg italic leading-8 text-[#5b5b5b]">
            By completing a purchase on Softavionix, you acknowledge and agree
            to this refund policy.
          </p>
        </div>
      </div>
    </main>
  );
}