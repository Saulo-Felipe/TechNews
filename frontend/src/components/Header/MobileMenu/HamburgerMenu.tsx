"use client";

import { ReactElement, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";

interface HamburgerMenuProps {
  children: ReactElement | ReactElement[];
}


export function HamburgerMenu({ children }: HamburgerMenuProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleChagenMenuState() {
    setMenuIsOpen(prev => !prev);
  }

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;

    body.style.overflow = menuIsOpen ? "hidden" : "auto";
  }, [menuIsOpen])

  return (
    <div className="hidden mobile:block z-[200]">
      <div onClick={handleChagenMenuState}>
        <RiMenu4Line className="text-xl" />
      </div>

      <div className={`${!menuIsOpen && "hidden"} bg-zinc-800 absolute w-[80vw] h-[100vh] 
        top-0 left-0 z-10 p-6`
      }>
        <div className="flex justify-end">
          <IoClose className={"text-lg"} onClick={handleChagenMenuState} />
        </div>

        {children}
      </div>

      <span className={`absolute w-[80vw] h-[100vh] bg-[rgb(0,0,0,0.7)] 
        backdrop-blur-md top-0 right-0 ${!menuIsOpen && "hidden"}`}
      />
    </div>
  );
}