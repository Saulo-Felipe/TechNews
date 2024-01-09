"use client";

import Link from "next/link";
import { Input } from "../_components/Input";
import { Button } from "@/components/Button";
import { AiOutlineLogin } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { DefaultResponse, ValidatorResponse } from "@/types/GeneralTypes";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

interface ClientFormProps {
  login: (formData: FormData) => Promise<DefaultResponse<string>>;
}

export function ClientFormLogin({ login }: ClientFormProps) {
  const [message, setMessage] = useState<ValidatorResponse>({});
  const [isLoading, setIsLoading] = useState(false);
  const msgTimeRef = useRef<NodeJS.Timeout>();


  async function handleLogin(event: React.FormEvent) {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    
    const response: ValidatorResponse = await login(formData)
    
    setMessage({ ...response });
    setIsLoading(false);

    if (response.success) {
      Cookies.set("auth_token", response.data);
      setTimeout(() => window.location.href = "/", 1000);
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
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-1">
        <label className="w-min" htmlFor="email-input">Email</label>
        <Input name="email" id="email-input" placeholder="Digite seu email" />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="w-min" htmlFor="password-input">Senha</label>
        <Input name="password" id="password-input" placeholder="Digite seu senha de acesso" />
      </div>

      <div className="text-xs flex items-center gap-1 mt-2 pt-2">
        <span>Não possui uma conta?</span>
        <Link className="underline text-blue-600" href={"/auth/register"}>Cadastre-se</Link>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          Icon={AiOutlineLogin}
          type="submit"
          loading={isLoading}
        >Entrar</Button>
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