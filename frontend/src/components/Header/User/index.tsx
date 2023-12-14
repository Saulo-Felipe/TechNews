import { User } from "@/types/GeneralTypes";
import Link from "next/link";
import { Suspense } from "react";
import { BiSolidUser } from "react-icons/bi";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";
import { Logout } from "./Logout";

interface UserProps {
  className?: string;
}

export async function User({ className }: UserProps) {
  const token = cookies().get("auth_token");

  let user: User | null = null;

  if (token) {
    user = await fetch(`${process.env["backend_url"]}/user/get-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        token: token["value"]
      }),
      cache: "no-cache"
    }).then(resp => resp.json());
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className={twMerge("flex items-center gap-3 smartphone:hidden", className)}>
        <div className="bg-[#121212] rounded-full border border-gray-500 w-8 h-8 flex items-center justify-center">
          <BiSolidUser className="text-xl text-[#4C4C4C]" />
        </div>

        {
          user ? (
            <div className="flex items-center gap-2">
              {user.username} 
              <Logout />
            </div>
          ) : (
            <Link href={"/auth/login"}>Entre / Cadastre-se</Link>
          )
        }
      </div>
    </Suspense>
  );
}


function Loading() {
  return (
    <div className="flex gap-2">
      <div className="h-6 w-24 bg-gray-800 animate-pulse rounded-md" />

      <div className="h-6 w-6 bg-gray-800 animate-pulse rounded-full" />
    </div>
  );
}