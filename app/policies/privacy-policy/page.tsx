import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#2f2f2f]">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
        <header className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight text-black md:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base text-[#6d6d6d]">
            Last Updated: January 27, 2026
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            At Softavionix, we are committed to protecting your privacy and
            safeguarding your personal information.
          </p>
        </header>

        <div className="space-y-14">
          <section className="rounded-3xl border border-[#d6e7f2] bg-[#edf7fc] px-6 py-7 md:px-8">
            <h2 className="text-2xl font-semibold">
              Privacy Commitment
            </h2>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              This Privacy Policy explains how we collect, use, disclose, and
              protect information when you visit our website or purchase our
              digital products.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              1. Information We Collect
            </h2>

            <h3 className="mt-6 text-xl font-semibold">
              1.1 Personal Information
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              When you make a purchase or interact with our website, we may
              collect:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing address</li>
              <li>Payment information processed securely by third-party providers</li>
              <li>Order history and transaction details</li>
            </ul>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f] font-medium">
              We do not store full payment card details on our servers.
            </p>

            <h3 className="mt-8 text-xl font-semibold">
              1.2 Automatically Collected Information
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              When you visit our website, we may automatically collect certain
              technical information, including:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages viewed and time spent on pages</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold">
              1.3 Order Verification Data
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              We may collect limited order-related information for fraud
              prevention, order verification, and customer support.
            </p>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              We do not monitor or access personal software usage beyond what is
              necessary to provide support.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              2. How We Use Your Information
            </h2>

            <h3 className="mt-6 text-xl font-semibold">
              2.1 Order Processing
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Process and fulfill orders</li>
              <li>Deliver digital products via email</li>
              <li>Send order confirmations</li>
              <li>Provide customer support</li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold">
              2.2 Communication
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Respond to inquiries</li>
              <li>Send service updates</li>
              <li>Send promotional emails with opt-out available</li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold">
              2.3 Website Improvement
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Analyze website performance</li>
              <li>Improve user experience</li>
              <li>Enhance functionality</li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold">
              2.4 Security
            </h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Detect fraud</li>
              <li>Prevent unauthorized access</li>
              <li>Maintain platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              3. Information Sharing and Disclosure
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f] font-medium">
              We do not sell your personal information.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              We may share information only in the following cases:
            </p>

            <h3 className="mt-6 text-xl font-semibold">
              3.1 Service Providers
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              With trusted third parties that assist us in operating our
              business, such as:
            </p>

            <div className="mt-5 rounded-3xl border border-[#e5e5e5] bg-white px-6 py-7">
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
                <li>Shopify as an e-commerce platform</li>
                <li>Payment processors such as Shopify Payments or PayPal</li>
                <li>Email delivery services</li>
                <li>Website hosting, analytics, and security tools</li>
              </ul>
            </div>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              These providers are authorized to use information only as
              necessary to perform their services.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              4. Cookies and Tracking Technologies
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Cookies are small files stored on your device that help improve
              functionality and analyze usage.
            </p>

            <div className="mt-5 rounded-3xl border border-[#ead8ee] bg-[#f8eef9] px-6 py-7">
              <p className="text-lg font-medium text-[#2f2f2f]">
                Types of Cookies Used
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
                <li>Essential cookies required for site operation</li>
                <li>Analytics cookies</li>
                <li>Marketing cookies</li>
                <li>Preference cookies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              5. Data Security
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              We use reasonable administrative, technical, and organizational
              measures to protect your information, including:
            </p>

            <div className="mt-5 rounded-3xl border border-[#cfe4d2] bg-[#edf7ee] px-6 py-7">
              <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
                <li>SSL/TLS encryption</li>
                <li>Secure payment processing via certified providers</li>
                <li>Platform-level security provided by Shopify</li>
                <li>Access controls and security monitoring</li>
              </ul>
            </div>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              No method of online transmission is completely secure, and
              absolute security cannot be guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              6. Your Rights and Choices
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              You may have the right to:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-8 text-[#3f3f3f]">
              <li>Access or update your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request deletion of personal data</li>
            </ul>

            <p className="mt-5 text-lg leading-8 text-[#3f3f3f]">
              Requests can be made by contacting{" "}
              <span className="font-medium">support@softavionix.com</span>.
            </p>
          </section>

          <section>
            <h2 className="text-[2rem] font-medium">
              GDPR & CCPA Rights
            </h2>

            <h3 className="mt-6 text-xl font-semibold">
              EU Residents (GDPR)
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              EU users may have rights including access, correction, deletion,
              restriction, portability, objection, and consent withdrawal.
            </p>

            <h3 className="mt-8 text-xl font-semibold">
              California Residents (CCPA)
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#3f3f3f]">
              California residents may have rights to access, deletion, and
              non-discrimination. We do not sell personal information.
            </p>
          </section>

          <section>
            <div className="rounded-[28px] bg-gradient-to-r from-sky-500 to-cyan-400 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="rounded-3xl bg-white px-6 py-8 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-[#6b7280]">
                  Contact Us
                </p>

                <p className="mt-4 text-2xl font-semibold text-[#2f2f2f] break-words">
                  support@softavionix.com
                </p>

                <p className="mt-3 text-lg text-[#4a4a4a]">
                  Softavionix
                </p>

                <p className="mt-2 text-base text-[#6b7280]">
                  www.softavionix.com
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-[#ddd7ca] pt-10">
          <p className="text-lg italic leading-8 text-[#5b5b5b]">
            By using our website, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}