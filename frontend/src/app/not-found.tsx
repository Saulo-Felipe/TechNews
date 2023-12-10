import { GoAlertFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "@/components/Button";


export default function NotFount() {


  return (
    <div className="flex items-center flex-col h-[100vh] gap-4 mt-56">
      <GoAlertFill className="text-8xl text-yellow-600" />
      <div className="text-5xl bold">Página não encontrada</div>
      <Link href={"/"} className="mt-4">
        <Button>Voltar ao inicio</Button>  
      </Link>
    </div>
  );
}