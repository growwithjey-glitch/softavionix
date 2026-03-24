export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Payment Successful
      </p>
      <h1 className="mt-4 text-4xl font-semibold">
        Thank you for your order.
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Your payment was received. Your digital order will be reviewed and delivered by email.
      </p>
    </main>
  );
}