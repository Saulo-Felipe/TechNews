import Image from "next/image";
import { SubHeader } from "./SubHeader";
import { User } from "@/components/Header/User";
import { CiCloudOn } from "react-icons/ci";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { Categories } from "./Categories";
import { MobileMenu } from "./MobileMenu";
import { DropdownOtherLinks } from "./DropdownOtherLinks";


export function Header() {
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
          
          <div className="flex gap-2 mobile:hidden items-center">
            <Categories />
            
            <DropdownOtherLinks />
          </div>

          <SearchInput />

          {/* only mobile */}
          <MobileMenu />
        </div>

      </section>
    </header>
  );
}

