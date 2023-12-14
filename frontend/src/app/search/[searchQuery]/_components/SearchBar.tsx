"use client";

import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface SearchBarProps {
  initialState: string;
}

export function SearchBar({ initialState }: SearchBarProps) {
  const router = useRouter();
  const [searchData, setSearchData] = useState(initialState);
  

  function handleSearch() {
    router.push(`/search/${searchData}`);
  }

  return (
    <div className="flex justify-center mb-14 mt-6">
      <div className="bg-neutral-300 relative rounded-md 
        w-full hover:shadow-md transition flex items-center">
        
        <div className="p-4 pl-6 flex w-full ">
          <input 
            className="bg-transparent outline-none w-full text-lg" 
            placeholder="Pesquise algo aqui" 
            value={searchData}
            onChange={({target}) => setSearchData(target.value)}
          />
        </div>

        <CiSearch onClick={handleSearch} className="text-2xl cursor-pointer p-2 h-12 w-12 mr-2
          hover:bg-[#c2c2c2] rounded-md transition" />

        <span className="h-4/5 bg-default-red w-1 absolute left-0 
          top-1/2 -translate-y-1/2 rounded-lg"/>
      </div>
    </div>
  );
}