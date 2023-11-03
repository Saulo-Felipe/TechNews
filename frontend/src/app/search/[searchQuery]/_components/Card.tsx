import Link from "next/link";

interface CardProps {
  cover_image_url: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  id: number;
}


export function Card({ category, createdAt, excerpt, cover_image_url, title, id }: CardProps) {


  return (
    <Link href={`/news/${id}`} className="flex w-3/4 gap-3">
      <div 
        style={{ backgroundImage: `url(${cover_image_url})` }}
        className="w-80 h-52 bg-red-500 bg-cover bg-center bg-no-repeat" 
      />

      <div className="flex-1 mt-1">
        <div className="flex justify-between items-center font-bold">
          <div className="text-default-red">{category}</div>
          <div className="text-neutral-600">{createdAt}</div>
        </div>

        <div className="font-bold py-2 text-lg">{title}</div>

        <div className="text-[larger] leading-6 text-black">{excerpt}</div>
      </div>
    </Link>
  );
}