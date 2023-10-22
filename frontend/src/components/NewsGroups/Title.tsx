import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";


interface TitleProps {
  title: string;
  link: string;
}

export function Title({ link, title }: TitleProps) {

  return (
    <Link href={link ? link : "#"}>
      <div className="border-l-4 border-default-red pl-2 flex items-center gap-2 font-bold">
        <div className="text-xl transition">{title}</div>
        <IoIosArrowForward className="text-2xl" />
      </div>
    </Link>    
  );
}