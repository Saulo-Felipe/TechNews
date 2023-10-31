import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {

  return (
    <div className="min-h-[100vh] flex justify-center">

      <div className="bg-white rounded-md w-[27vw] h-min mt-10 p-6 tablet:w-[50vw] smartphone:w-[90vw]">
        <Image 
          className="mb-6"
          width={200} 
          height={100} 
          src="/images/inline-logotipo.png" 
          alt="technews logotipo" 
        />
        
        <div className="flex items-center border p-2 pl-4 gap-2 rounded-md cursor-pointer border-neutral-400 hover:border-neutral-600">
          <FcGoogle className="text-2xl" />
          <span>Cadastre-se com Google</span>
        </div>

        <div className="text-center py-2 text-neutral-500 select-none">Ou</div>

        <div className="flex flex-col gap-1">
          <label className="w-min" htmlFor="email-input">Email</label>
          <Input id="email-input" placeholder="Digite seu email"/>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label className="w-min" htmlFor="password-input">Senha</label>
          <Input id="password-input" placeholder="Digite seu senha de acesso"/>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="password2-input">Confirme sua senha</label>
          <Input id="password2-input" placeholder="Digite seu senha de acesso novamente" />
        </div>

        <div className="text-xs flex items-center gap-1 mt-2 pt-2">
          <span>Já possui uma conta?</span> 
          <Link className="underline text-blue-600" href={"/auth/login"}>Entre</Link>
        </div>

        <div className="flex justify-end pt-6">
          <Button>Finalizar Cadastro</Button>
        </div>
      </div>
    </div>    
  );
}