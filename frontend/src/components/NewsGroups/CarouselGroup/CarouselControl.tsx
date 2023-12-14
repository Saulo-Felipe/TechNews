"use client";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useRef } from "react";

export function CarouselControl({ children }: { children: JSX.Element }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function handleCarouselAdvance() {
    carouselRef.current?.scrollBy(400, 0);
  }

  function handleCarouselBack() {
    carouselRef.current?.scrollBy(-400, 0);
  }

  return (
    <>
      <div className="overflow-hidden scroll-smooth" ref={carouselRef}>
        {children}
      </div>

      <div
        className="bg-white border rounded-full h-10 w-10 -left-6 z-10 absolute smartphone:left-0
        flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition"
        onClick={handleCarouselBack}
      >
        <MdArrowBackIosNew />
      </div>

      <div
        className="bg-white border rounded-full h-10 w-10 -right-6 z-10 absolute smartphone:right-0
        flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition"
        onClick={handleCarouselAdvance}
      >
        <MdArrowForwardIos />
      </div>
    </>
  );
}
