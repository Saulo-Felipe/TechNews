import Image from "next/image";
import { SubHeader } from "./SubHeader";
import { User } from "@/components/Header/User";
import { CiCloudOn } from "react-icons/ci";
import { RiMenu4Line } from "react-icons/ri";
import Link from "next/link";
import { Category } from "@/types/GeneralTypes";
import { SearchInput } from "./SearchInput";


export async function Header() {
  const fetchResponse = await fetch(`${process.env["backend_url"]}/category?limit=5`, {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 24 // 24 hours 
    }
  });
  const categories: Category[] = await fetchResponse.json();


  return (
    <header className="bg-black text-white">
      <section className="px-desktop bg-[#121212] text-xs py-2 flex items-center justify-between tablet:px-tablet smartphone:px-smartphone">
        <div className="items-center flex gap-2">
          <CiCloudOn className="w-6 h-6" />

          <SubHeader />
        </div>

        <div className="smartphone:hidden">Segunda, 04 de outubro de 2023</div>
      </section>

      <section className="flex items-center justify-between px-desktop tablet:px-tablet smartphone:px-smartphone smartphone:gap-2">
        <div className="flex items-center gap-6 smartphone:gap-2">
          <Link href={"/"}>
            <Image 
              width={70} 
              height={70} 
              src={"/images/logotipo.png"} 
              alt="logotipo da technews" 
              className="smartphone:w-14"
            />
          </Link>

          <User />
        </div>

        <div className="flex items-center gap-6 smartphone:gap-2 smartphone:flex-1">
          <nav className="flex gap-3 mobile:hidden">
            {
              categories.map(({name, id}) => 
                <Link key={id} href={`/category/${name}`}>
                  {name[0].toUpperCase()+name.slice(1)}
                </Link>
              )
            }
          </nav>

          <SearchInput />

          {/* only mobile */}
          <div className="hidden mobile:block">
            <RiMenu4Line className="text-xl" />
          </div>
        </div>

      </section>
    </header>
  );
}