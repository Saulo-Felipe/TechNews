import Image from "next/image";
import { SubHeaderContent } from "./SubHeaderContent";
import { Suspense } from "react";
import { UserLoading } from "@/app/(home)/_components/User/UserLoading";
import { User } from "@/app/(home)/_components/User/User";
import { CiCloudOn, CiSearch } from "react-icons/ci";


export function Header() {
  return (
    <header className="bg-black text-white">
      <div className="px-main-container bg-[#2B2B2B] flex gap-2 text-xs py-2 items-center">
        <CiCloudOn className={"w-6 h-6"} />

        <Suspense fallback={<span className="animate-pulse bg-[rgb(0,0,0,0.25)] w-20 h-6 rounded-md" />}>
          <SubHeaderContent />
        </Suspense>
      </div>        
      
      <section className="flex items-center justify-between px-main-container">
        <Image width={70} height={70} src={"/images/logotipo.png"} alt="logotipo da technews" />

        <nav className="flex gap-2">
          <div>categoria 1</div>
          <div>categoria 2</div>
          <div>categoria 3</div>
          <div>categoria 4</div>
          <div>categoria 5</div>
        </nav>

        <div className="flex transition hover:flex-[0.55]">
          <input 
            type="text" 
            placeholder="Faça uma pesquisa" 
            className="bg-[#121212] flex-1 transition placeholder-[#4C4C4C] p-3 outline-none pl-4 rounded-l-md hover:brightness-110"
          />

          <button className="bg-[#212121] p-2 px-3 flex items-center justify-center rounded-r-md hover:brightness-110">
            <CiSearch className="text-base" />
          </button>
        </div>

        <Suspense fallback={<UserLoading />}>
          <User />
        </Suspense>
      </section>
    </header>
  );
}