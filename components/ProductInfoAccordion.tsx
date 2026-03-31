"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export default function ProductInfoAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const items: AccordionItem[] = [
    {
      title: "Delivery & Activation",
      content: (
        <div className="space-y-3 text-sm leading-7 text-slate-600">
          <p>
            This is a digital product and will be delivered electronically by
            email after successful payment confirmation.
          </p>
          <p>
            Activation or access instructions are included where applicable.
            Please follow the provided steps carefully.
          </p>
          <p>
            If you do not see your order email, check your spam or junk folder
            before contacting support.
          </p>
        </div>
      ),
    },
    {
      title: "Compatibility",
      content: (
        <div className="space-y-3 text-sm leading-7 text-slate-600">
          <p>
            Please review the product title, description, supported platform,
            device requirements, and any region limitations before purchase.
          </p>
          <p>
            Customers are responsible for ensuring the selected product matches
            their intended usage and environment.
          </p>
        </div>
      ),
    },
    {
      title: "Refund Policy",
      content: (
        <div className="space-y-3 text-sm leading-7 text-slate-600">
          <p>
            Refunds for digital products are available only in eligible cases,
            such as non-delivery, invalid activation, duplicate purchase, or
            receiving the wrong product.
          </p>
          <p>
            Please review the full policy for all conditions and exclusions.
          </p>
          <p>
            <Link
              href="/policies/refund-policy"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              View Refund Policy
            </Link>
          </p>
        </div>
      ),
    },
    {
      title: "Support",
      content: (
        <div className="space-y-3 text-sm leading-7 text-slate-600">
          <p>
            Support is available for delivery, access, and activation-related
            questions.
          </p>
          <p>
            Contact:{" "}
            <span className="font-medium text-slate-900">
              support@softavionix.com
            </span>
          </p>
          <p>Response time is typically within 24 hours.</p>
        </div>
      ),
    },
  ];

  return (
    <section className="mt-14">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-900">
          Product Information
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Important information about delivery, compatibility, refunds, and
          support.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.title}
              className={index !== items.length - 1 ? "border-b border-slate-200" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {item.title}
                </span>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}