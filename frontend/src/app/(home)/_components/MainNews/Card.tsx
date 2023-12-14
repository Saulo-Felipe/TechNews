import { NewsPreview } from "@/types/GeneralTypes";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CardProps extends NewsPreview {
  cardPadding: string;
  titleSize: string;
  gradient?: boolean;
}

export function Card({ 
  cardPadding, 
  titleSize, 
  cover_image_url, 
  excerpt, 
  id, 
  title,
  gradient=true
}: CardProps) {

  return (
    <Link 
      className="flex-1 flex items-end group relative overflow-hidden" 
      href={`/news/${id}`}
    >
      <div
        className="group-hover:scale-110 news-image w-full h-full bg-no-repeat bg-cover bg-center 
        absolute transition -z-10"
        style={{backgroundImage: `url(${cover_image_url?.replace("w=", "w=1000&")})`}}
      />
      <div className={`w-full h-full absolute -z-10 
        ${gradient ? "bg-[radial-gradient(transparent,rgb(0,0,0,0.8))]" : "bg-slate-300"}`} 
      />

      <div className={twMerge(cardPadding, "text-white smartphone:p-3")}>
        <div className="py-2 line-clamp-2">{excerpt}</div>
        <div className={twMerge(titleSize, "font-bold smartphone:text-2xl line-clamp-2")}>{title}</div>
      </div>
    </Link>
  );
}