import { ShieldCheck, Zap, Globe, LifeBuoy } from "lucide-react";

const badges = [
  {
    label: "Secure Checkout",
    icon: ShieldCheck,
    className: "text-green-700 bg-green-50 border-green-200",
  },
  {
    label: "Fast Email Delivery",
    icon: Zap,
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    label: "Global Activation",
    icon: Globe,
    className: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    label: "Human Support",
    icon: LifeBuoy,
    className: "text-violet-700 bg-violet-50 border-violet-200",
  },
];

export default function TrustBadgeRow() {
  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-3 md:px-8">
        {badges.map((badge) => {
          const Icon = badge.icon;

          return (
            <div
              key={badge.label}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${badge.className}`}
            >
              <Icon className="h-4 w-4" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}