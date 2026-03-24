import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Softavionix
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/policies/refund-policy">Refund Policy</Link>
          <Link href="/policies/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}