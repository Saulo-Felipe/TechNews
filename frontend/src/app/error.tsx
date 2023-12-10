"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import { BiSolidErrorCircle } from "react-icons/bi";


export default function Error() {
  return (
    <div className="flex items-center flex-col h-[100vh] gap-4 mt-56">
      <BiSolidErrorCircle className="text-8xl text-red-600" />
      <div className="text-5xl bold">Ocorreu um erro inesperado</div>
      <Link href={"/"} className="mt-4">
        <Button>Voltar ao inicio</Button>  
      </Link>
    </div>
  );
}