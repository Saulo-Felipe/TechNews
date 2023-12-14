import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}


export function Input({className, ...props}: InputProps) {


  return (
    <input 
      {...props}
      className={twMerge("p-3 border border-neutral-400 rounded-md hover:border-neutral-500", className)} 
      placeholder="Digite seu senha de acesso novamente" 
    />
  );
}