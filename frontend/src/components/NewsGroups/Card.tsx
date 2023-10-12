import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  title: string;
  imageUrl: string;

  height?: string;
  width?: string;
  description?: string;
  rankingPosition?: number;
}


export function NewsCard({description, imageUrl, title, rankingPosition, height="h-40", width="w-1/3"}: CardProps) {

  return (
    <div className={`${width} group cursor-pointer border border-transparent`}>
      <div className="bg-black overflow-hidden relative">
        {typeof rankingPosition !== "undefined" && ( 
          <span className="bg-default-red text-white absolute z-10 right-0 top-0 
          h-8 w-8 rounded-bl-2xl font-bold items-center flex justify-center">
            {rankingPosition}
          </span>
        )}
        <div 
          className={twMerge(height, "w-full opacity-75 bg-cover bg-center group-hover:scale-110 transition")}
          style={{backgroundImage: `url(${imageUrl})`}} 
        />
      </div>

      <div className="group-hover:text-default-red transition font-bold text-xl pt-2">
        {title}
      </div>

      <div className="">{description}</div>
    </div>
  );
}