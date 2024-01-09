"use client";

import Link from "next/link";
import { Input } from "../_components/Input";
import { Button } from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { DefaultResponse, ValidatorResponse } from "@/types/GeneralTypes";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface ClientFormProps {
  register: (formData: FormData) => Promise<DefaultResponse<string>>;
}

export function ClientFormRegister({ register }: ClientFormProps) {
  const [message, setMessage] = useState<ValidatorResponse>({});
  const [isLoading, setIsLoading] = useState(false);
  const msgTimeRef = useRef<NodeJS.Timeout>();
  const navigate = useRouter();

  async function handleRegister(event: React.FormEvent) {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const response: ValidatorResponse = await register(formData);
    setIsLoading(false);
    setMessage({ ...response });

    if (response.success) {
      setTimeout(() => {
        navigate.push("/auth/login");
      }, 1000);
    }
  }

  useEffect(() => {
    if (Object.keys(message).length > 0) {
      clearInterval(msgTimeRef.current);

      msgTimeRef.current = setTimeout(() => {
        setMessage({});
      }, 4000)
    }
  }, [message]);

  return (
    <form onSubmit={handleRegister}>
      <div className="flex flex-col gap-1">
        <label className="w-max" htmlFor="username">Nome de usuário</label>
        <Input name="username" id="username" placeholder="Nome de usuário"/>
      </div>
            
      <div className="flex flex-col gap-1 mt-4">
        <label className="w-max" htmlFor="email-input">Email</label>
        <Input name="email" id="email-input" placeholder="Digite seu email"/>
      </div>
      
      <div className="flex flex-col gap-1 mt-4">
        <label className="w-max" htmlFor="password-input">Senha</label>
        <Input name="password" id="password-input" placeholder="Digite seu senha de acesso"/>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="password2-input">Confirme sua senha</label>
        <Input name="password2" id="password2-input" placeholder="Digite seu senha de acesso novamente" />
      </div>

      <div className="text-xs flex items-center gap-1 mt-2 pt-2">
        <span>Já possui uma conta?</span> 
        <Link className="underline text-blue-600" href={"/auth/login"}>Entre</Link>
      </div>

      <div className="flex justify-end pt-6">
        <Button 
          loading={isLoading} 
          type="submit"
        >Finalizar Cadastro{isLoading}</Button>
      </div>

      {
        message.message?.map((msg, i) => {
          let color = "text-red-600";

          if (message.success) color = "text-green-600";

          return (
            <div
              key={i}
              className={twMerge(color, "text-center py-1")}
            >{msg}</div>
          )
        })
      }

    </form>
  );
}