import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <p className="font-medium text-slate-900">Softavionix</p>
          <p className="mt-2">
            Digital software and subscription products delivered by email.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <Link href="/policies/refund-policy">Refund Policy</Link>
          <Link href="/policies/privacy-policy">Privacy Policy</Link>
          <Link href="/policies/terms-of-service">Terms of Service</Link>
          <Link href="/policies/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}