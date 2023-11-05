"use client";

import Link from "next/link";
import { Input } from "../_components/Input";
import { Button } from "@/components/Button";
import { AiOutlineLogin } from "react-icons/ai";
import { useEffect, useState } from "react";
import { DefaultResponse, ValidatorResponse } from "@/types/GeneralTypes";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ClientFormProps {
  login: (formData: FormData) => Promise<DefaultResponse<string>>;
}

export function ClientForm({ login }: ClientFormProps) {
  const [message, setMessage] = useState<ValidatorResponse>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    login(formData).then(async (response: ValidatorResponse) => {
      setIsLoading(false);
      setMessage({ ...response });

      if (response.success) setTimeout(() => navigation.push("/"), 1000);
    });
  }

  useEffect(() => {
    setTimeout(() => setMessage({}), 4000);
  }, [message]);

  return (
    <form action={handleLogin}>
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
              className={twMerge(color, "text-red-600 text-center py-4")}
            >{msg}</div>
          )
        })
      }

    </form>
  );
}