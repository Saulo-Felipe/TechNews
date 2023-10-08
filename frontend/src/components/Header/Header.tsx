import { SubHeader } from "./SubHeader";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

export function Header() {

  return (
    <header className="border border-red-600 bg-black text-white">
      <SubHeader />

      <section className="flex items-end justify-between px-24">
        <section>
          <Image 
            width={75} 
            height={75} 
            src={"/technews-logotipo.png"} 
            alt={"logo do technews"} 
          />
        </section>

        <section className="flex gap-3 pb-4">
          <div>category 1</div>
          <div>category 2</div>
          <div>category 3</div>
          <div>category 4</div>
          <div>category 5</div>
          <div>category 6</div>
        </section>

        <section className="flex items-center gap-2 pb-4">
          <div>Entre / Cadastre-se</div>
          <FaUserAlt className="w-4 h-4" />
        </section>
      </section>
    </header>
  );
}