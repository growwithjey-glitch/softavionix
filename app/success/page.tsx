import { stripe } from "@/lib/stripe";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Mail,
} from "lucide-react";

type Props = {
  searchParams: {
    session_id?: string;
  };
};

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;

  let lineItems: any[] = [];
  let customerEmail: string | null = null;

  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      {
        expand: ["line_items"],
      }
    );

    lineItems = session.line_items?.data || [];
    customerEmail = session.customer_details?.email || null;
  }

  return (
    <main className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
          {/* Success icon */}

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h1 className="mt-6 text-4xl font-semibold text-slate-900">
              Order Confirmed
            </h1>

            <p className="mt-3 text-slate-600">
              Your payment was successful.
            </p>
          </div>

          {/* Order details */}

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Order Details
            </h2>

            <div className="mt-6 space-y-4">
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-slate-600" />

                    <div>
                      <p className="font-medium">
                        {item.description}
                      </p>

                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    $
                    {(
                      item.amount_total / 100
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Email notice */}

          {customerEmail && (
            <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-700" />

                <div>
                  <p className="font-semibold text-blue-900">
                    Delivery Email
                  </p>

                  <p className="text-sm text-blue-800">
                    Your digital product will be sent to:
                  </p>

                  <p className="mt-1 font-medium text-blue-900">
                    {customerEmail}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Link>

            <Link
              href="/license-faq"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              License FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}