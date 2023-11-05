import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Metadata } from "next";
import { ClientForm } from "./ClientForm";


export const metadata: Metadata = {
  title: "TechNews - Entre na sua conta"
};


export default function LoginPage() {
  
  async function login(formData: FormData) {
    "use server";

    const response = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    const parsedResponse = await response.json();
    
    return parsedResponse;
  }
  
  return (
    <div className="min-h-[100vh] flex justify-center">

      <div className="bg-white rounded-md w-[27vw] h-min mt-10 p-6 
        border tablet:w-[50vw] smartphone:w-[90vw]">
        <Image 
          className="mb-6"
          width={200} 
          height={100} 
          src="/images/inline-logotipo.png" 
          alt="technews logotipo" 
        />
        
        <div className="flex items-center border p-2 pl-4 gap-2 rounded-md cursor-pointer border-neutral-400 hover:border-neutral-600">
          <FcGoogle className="text-2xl" />
          <span>Entrar com Google</span>
        </div>

        <div className="text-center py-2 text-neutral-500 select-none">Ou</div>

        
        <ClientForm login={login} />
      </div>
    </div>
  );
}
