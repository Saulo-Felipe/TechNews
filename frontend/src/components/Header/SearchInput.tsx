"use client";

import { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useRouter();

  function handleNavigateToSearch() {
    navigation.push("/search/"+inputRef.current?.value);
  }

  useEffect(() => {
    window.addEventListener("keypress", ({key}) => {
      if (key === "Enter") {
        if (document.activeElement === inputRef.current) {
          handleNavigateToSearch();
        }
      }
    });
  }, []);

  return (

    <div className="flex rounded-md transition bg-[#121212] smartphone:flex-1">
      <input
        ref={inputRef}
        type="text"
        placeholder="Faça uma pesquisa"
        className="bg-[#121212] flex-1 transition placeholder-[#4C4C4C] p-3 
        outline-none pl-4 hover:brightness-110 rounded-md
        text-neutral-200
        smartphone:p-2 text-xs"
        onChange={({target}) => {
          if (inputRef.current?.value) {
            inputRef.current.value = target.value;
          }
        }}
      />

      <button  
        className=" p-2 px-3 flex items-center justify-center rounded-md hover:brightness-110"
        onClick={handleNavigateToSearch}
      >
        <CiSearch className="text-base" />
      </button>
    </div>    
  );
}