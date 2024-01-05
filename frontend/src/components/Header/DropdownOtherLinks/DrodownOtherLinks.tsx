"use cliente";

import Link from "next/link";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { twJoin } from "tailwind-merge";

export function DropdownOtherLinks() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  function handleChangeDropdownState() {
    setDropdownIsOpen(prev => !prev);
  }

  return (
    <div className="relative ml-2">
      <FaGear className="text-xl cursor-pointer" onClick={handleChangeDropdownState} />

      <div 
        className={twJoin(`absolute flex flex-col w-max bg-gray-950 border select-none
          border-gray-600 p-4 rounded-md gap-2 right-0 top-[calc(100%+0.75rem)] z-50`,
          dropdownIsOpen ? "block" : "hidden"
        )}
      >
        <Link 
          onClick={handleChangeDropdownState}
          className="bg-[rgb(255,255,255,0.03)] border border-neutral-800 p-1 rounded-md" 
          href={"/update-database"}>
          Atualizar base de dados</Link>          

        <Link 
          onClick={handleChangeDropdownState}
          className="bg-[rgb(255,255,255,0.03)] border border-neutral-800 p-1 rounded-md" 
          href={"/create-news"}>
          Criar nova notícia</Link>            
      </div>
    </div>    
  );
}