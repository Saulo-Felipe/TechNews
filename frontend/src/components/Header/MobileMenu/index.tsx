import { HamburgerMenu } from "./HamburgerMenu";
import { User } from "../User";
import { Categories } from "../Categories";
import { BiCategoryAlt } from "react-icons/bi";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";


export function MobileMenu() {

  return (
    <HamburgerMenu>
      <User className="smartphone:flex" />

      <hr className="opacity-30 mt-2" />

      <div className="mt-8">
        <div className="flex items-center font-bold mb-4 gap-2">
          <BiCategoryAlt className="text-xl" />
          Categorias
        </div>
        
        <Categories className="pl-6 mobile:flex flex-col items-start" />
      </div>

      <div className="mt-8 flex-col flex">
        <div className="flex items-center font-bold mb-4 gap-2">
          <FaGear className="text-xl" />
          Configurações
        </div>

        <div className="flex flex-col gap-3 pl-6">
          <Link href={"/update-database"}>
            Atualizar base de dados
          </Link>

          <Link href={"/create-news"}>
            Criar nova notícia
          </Link>
        </div>
      </div>

    </HamburgerMenu>
  );
}