import Link from "next/link";

interface CardProps {
  cover_image_url: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  id: number;
}


export function   Card({ 
  category, 
  createdAt, 
  excerpt, 
  cover_image_url, 
  title, 
  id
}: CardProps) {


  return (
    <Link href={`/news/${id}`} className="flex w-3/4 gap-3 mobile:w-full smartphone:items-center">
      <div 
        style={{ backgroundImage: `url(${cover_image_url})` }}
        className="w-80 h-52 bg-red-500 bg-cover bg-center bg-no-repeat 
        smartphone:w-[40vw] smartphone:h-[40vw]" 
      />

      <div className="flex-1 mt-1">
        <div className="flex justify-between items-center font-bold">
          <div className="text-default-red">{category}</div>
          <div className="text-neutral-600">
            {new Date(createdAt).toLocaleString().split(",")[0]}
          </div>
        </div>

        <div className="font-bold py-2 text-lg line-clamp-2">{title}</div>

        <div className="text-[larger] leading-6 text-black line-clamp-3">{excerpt}</div>
      </div>
    </Link>
  );
}