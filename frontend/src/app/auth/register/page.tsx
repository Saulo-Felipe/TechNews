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
 
        <ClientFormRegister register={registerAction} />
      </div>
    </div>    
  );
}