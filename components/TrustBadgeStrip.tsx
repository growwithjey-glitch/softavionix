export default function TrustBadgeStrip() {
  const badges = [
    {
      title: "Fast Email Delivery",
      tone: "bg-blue-50 text-blue-700 border-blue-200",
      icon: "🚀",
    },
    {
      title: "Secure Checkout",
      tone: "bg-zinc-100 text-zinc-700 border-zinc-200",
      icon: "🔒",
    },
    {
      title: "Global Activation",
      tone: "bg-amber-50 text-amber-700 border-amber-200",
      icon: "🌍",
    },
    {
      title: "Verified / Tested",
      tone: "bg-green-50 text-green-700 border-green-200",
      icon: "✓",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-6 md:px-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${badge.tone}`}
          >
            <span>{badge.icon}</span>
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}