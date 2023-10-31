import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  title: string;
  imageUrl: string;
  excerpt: string;
  id: number;

  height?: string;
  width?: string;
  description?: string;
  rankingPosition?: number;
}


export function NewsCard({
  description, 
  imageUrl, 
  title, 
  rankingPosition, 
  height="h-40", 
  width="w-1/3",
  id,
  excerpt
}: CardProps) {

  return (
    <div className={`${width} group cursor-pointer border border-transparent`}>
      <Link href={`/news/${id}`}>
        <div className="overflow-hidden relative">
          {typeof rankingPosition !== "undefined" && ( 
            <span className="bg-default-red text-white absolute z-10 right-0 top-0 
            h-8 w-8 rounded-bl-2xl font-bold items-center flex justify-center">
              {rankingPosition}
            </span>
          )}
          <div 
            className={twMerge(height, "w-full  bg-cover bg-center group-hover:scale-110 transition")}
            style={{backgroundImage: `url(${imageUrl})`}} 
          />
        </div>

        <div className="group-hover:text-default-red transition font-bold text-lg leading-6 pt-2">
          {title}
        </div>

        <div className="!text-black line-clamp-2 pt-1">{excerpt}</div>

        <div className="">{description}</div>
      </Link>
    </div>
  );
}