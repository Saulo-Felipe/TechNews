import { User } from "@/types/GeneralTypes";
import Link from "next/link";
import { Suspense } from "react";
import { BiSolidUser } from "react-icons/bi";
import { cookies } from "next/headers";


async function User() {
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
    <div className="flex items-center gap-3 smartphone:hidden">
      <div className="bg-[#121212] rounded-full w-8 h-8 flex items-center justify-center">
        <BiSolidUser className="text-xl text-[#4C4C4C]" />
      </div>

      {
        user ? (
          <div>{user.username}</div>
        ) : (
          <Link href={"/auth/login"}>Entre / Cadastre-se</Link> 
        )
      }
    </div>
  );
}


function UserLoading() {
  return (
    <Suspense fallback={
      <div className="flex gap-2">
        <div className="h-6 w-24 bg-gray-800 animate-pulse rounded-md" />

        <div className="h-6 w-6 bg-gray-800 animate-pulse rounded-full" />
      </div>
    }>
      <User />
    </Suspense>
  );
}


export { UserLoading as User };