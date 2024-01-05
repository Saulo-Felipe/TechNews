import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Metadata } from "next";
import { ClientFormLogin } from "./ClientFormLogin";


export const metadata: Metadata = {
  title: "TechNews - Entre na sua conta"
};


export default function LoginPage() {
  
  async function loginAction(formData: FormData) {
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
        
        <ClientFormLogin login={loginAction} />
      </div>
    </div>
  );
}
