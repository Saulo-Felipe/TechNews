import Image from "next/image";
import { SubHeaderContent } from "./SubHeaderContent";
import { Suspense } from "react";
import { UserLoading } from "@/components/Header/User/UserLoading";
import { User } from "@/components/Header/User/User";
import { CiCloudOn, CiSearch } from "react-icons/ci";


export function Header() {
  return (
    <header className="bg-black text-white">
      <section className="px-desktop-container bg-[#2B2B2B] text-xs py-2 flex items-center justify-between">
        <div className="items-center flex gap-2">
          <CiCloudOn className={"w-6 h-6"} />

          <Suspense fallback={<span className="animate-pulse bg-[rgb(0,0,0,0.25)] w-20 h-6 rounded-md" />}>
            <SubHeaderContent />
          </Suspense>
        </div>

        <div>Segunda, 04 de outubro de 2023</div>
      </section>

      <section className="flex items-center justify-between px-desktop-container">
        <div className="flex items-center gap-6">
          <Image width={70} height={70} src={"/images/logotipo.png"} alt="logotipo da technews" />

          <Suspense fallback={<UserLoading />}>
            <User />
          </Suspense>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-3">
            <div>categoria 1</div>
            <div>categoria 2</div>
            <div>categoria 3</div>
            <div>categoria 4</div>
            <div>categoria 8</div>
          </nav>

          <div className="flex rounded-md transition bg-[#121212]">
            <input
              type="text"
              placeholder="Faça uma pesquisa"
              className="
              bg-[#121212] flex-1 transition placeholder-[#4C4C4C] p-3 
                outline-none pl-4 hover:brightness-110 rounded-md
                text-neutral-200
              "
            />

            <button className=" p-2 px-3 flex items-center justify-center rounded-md hover:brightness-110">
              <CiSearch className="text-base" />
            </button>
          </div>
        </div>

      </section>
    </header>
  );
}