import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface TitleProps {
  title: string;
  link: string;

  loading?: boolean;
}

export function Title({ link, title, loading }: TitleProps) {

  return (
    <Link href={link ? link : "#"} className="w-max">
      <div className={`border-l-4 border-default-red pl-2 flex items-center gap-2 font-bold 
        ${loading ? "bg-slate-300 animate-pulse w-max rounded-md text-transparent" : ""}`}
      >
        <div className="text-xl transition">
          { loading ? "This title is loading"  : title }
        </div>
        <IoIosArrowForward className="text-2xl" />
      </div>
    </Link>    
  );
}