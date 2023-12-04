import { Metadata } from "next";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { ClientFormRegister } from "./ClientFormRegister";

export const metadata: Metadata = {
  title: "TechNews - Cadastre-se"
};

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {

  async function registerAction(formData: FormData) {
    "use server";
    
    const fetchJson = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    const response = await fetchJson.json();

    console.log(response);

    return response;
  }

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

        <ClientFormRegister register={registerAction} />
      </div>
    </div>    
  );
}