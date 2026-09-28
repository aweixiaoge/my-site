"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex];

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-neutral-200">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="flex gap-4">
          {images.map((image, index) => (
            <button
              key={`${index}-${image}`}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-[149px] flex-1 overflow-hidden rounded-xl ${
                index === selectedIndex
                  ? "border-2 border-accent"
                  : "border border-neutral-200"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
