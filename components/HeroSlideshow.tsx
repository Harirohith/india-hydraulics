"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/stock/excavator-hydraulic.jpg", label: "Construction & Mining" },
  { src: "/im/Borewell_truck.jpg",         label: "Borewell & Drilling"   },
  { src: "/im/lmw_tuning.jpg",             label: "In-House Manufacturing" },
];

export function HeroBg() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden="true"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gray-950/72" />
      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={slide.label}
            className={`h-0.5 transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-3 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
