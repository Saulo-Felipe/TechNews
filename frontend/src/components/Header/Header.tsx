import Image from "next/image";
import { SubHeaderContent } from "./SubHeaderContent";
import { Suspense } from "react";
import { UserLoading } from "@/components/Header/User/UserLoading";
import { User } from "@/components/Header/User/User";
import { CiCloudOn, CiSearch } from "react-icons/ci";
import { RiMenu4Line } from "react-icons/ri";
import Link from "next/link";
import { Category } from "@/types/GeneralTypes";


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

          <Suspense fallback={<span className="animate-pulse bg-[rgb(0,0,0,0.25)] w-20 h-6 rounded-md" />}>
            <SubHeaderContent />
          </Suspense>
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

          <Suspense fallback={<UserLoading />}>
            <User />
          </Suspense>
        </div>

        <div className="flex items-center gap-6 smartphone:gap-2 smartphone:flex-1">
          <nav className="flex gap-3 mobile:hidden">
            {
              categories.map(({name, id}) => 
                <Link key={id} href={`/category/${name}`}>{name}</Link>
              )
            }
          </nav>

          <div className="flex rounded-md transition bg-[#121212] smartphone:flex-1">
            <input
              type="text"
              placeholder="Faça uma pesquisa"
              className="
              bg-[#121212] flex-1 transition placeholder-[#4C4C4C] p-3 
                outline-none pl-4 hover:brightness-110 rounded-md
                text-neutral-200
                smartphone:p-2 text-xs
              "
            />

            <button className=" p-2 px-3 flex items-center justify-center rounded-md hover:brightness-110">
              <CiSearch className="text-base" />
            </button>
          </div>

          {/* only mobile */}
          <div className="hidden mobile:block">
            <RiMenu4Line className="text-xl" />
          </div>
        </div>

      </section>
    </header>
  );
}