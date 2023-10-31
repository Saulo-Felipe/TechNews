"use client";

import { useRef } from "react";
import { NewsCard } from "./Card";
import { NewsGroupProps } from "./SimpleGroup";
import { Title } from "./Title";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export function NewsCarouselGroup({ groupLink, groupTitle, news}: NewsGroupProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function handleCarouselAdvance() {
    carouselRef.current?.scrollBy(400, 0);
  }

  function handleCarouselBack() {
    carouselRef.current?.scrollBy(-400, 0);
  }

  return (
    <div className="pt-10 flex flex-col gap-4">
      <Title title={groupTitle} link={groupLink} />

      {
        news.length > 0 ? (
          <div className="relative flex items-center">
            <div className="overflow-hidden scroll-smooth" ref={carouselRef}>
              <div className="w-max flex gap-2">
                {
                  news.map((item, i) => 
                    <NewsCard 
                      rankingPosition={i} 
                      width="w-72" 
                      key={i} 
                      imageUrl={item.cover_image_url} 
                      {...item} 
                    />
                  )
                }
              </div>
            </div>

            <div
              className="
                bg-white border rounded-full h-10 w-10 -left-6 z-10 absolute smartphone:left-0
                flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition
              "
              onClick={handleCarouselBack}
            >
              <MdArrowBackIosNew />
            </div>

            <div
              className="
                bg-white border rounded-full h-10 w-10 -right-6 z-10 absolute smartphone:right-0
                flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition
              "
              onClick={handleCarouselAdvance}
            >
              <MdArrowForwardIos />
            </div>
          </div>
        ) : (
          <div className="pl-3">Nenhuma notícia disponível nessa seção</div>
        )
      }
    </div>
  );
}