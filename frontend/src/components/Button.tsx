import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  Icon?: IconType;
  loading?: boolean;
}

export function Button({loading, children, className, Icon, ...props}: ButtonProps) {

  return (
    <button
      {...props}
      disabled={loading}
      className={
        twMerge(`bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-900 flex
        items-center justify-center gap-2 text-sm disabled:opacity-75 disabled:cursor-not-allowed`,
        className)
      }
    >
      {children}

      {
        loading 
          ? <CgSpinner className="text-white animate-spin h-4 w-4 m-0 mr-0" />
          : Icon && <Icon className="text-lg" />
      }
    </button>
  );
}