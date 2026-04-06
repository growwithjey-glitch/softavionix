"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export default function ProductGallery({
  name,
  images,
}: ProductGalleryProps) {
  const safeImages = images.length ? images : ["/products/placeholder.png"];
  const [selectedImage, setSelectedImage] = useState(safeImages[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%)]" />
          <div className="absolute left-6 top-6 z-10 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            Digital Delivery
          </div>

          <div className="relative h-full w-full p-8 md:p-12">
            <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <Image
                src={selectedImage}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 transition duration-300 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {safeImages.map((image, index) => {
          const active = selectedImage === image;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden rounded-2xl border bg-white transition ${
                active
                  ? "border-blue-500 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`${name} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain p-3"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}