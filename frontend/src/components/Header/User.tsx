import Link from "next/link";
import { Suspense } from "react";
import { BiSolidUser } from "react-icons/bi";


async function User() {

  await new Promise(resolve => setTimeout(resolve, 4000));

  return (
    <div className="flex items-center gap-3 smartphone:hidden">
      <div className="bg-[#121212] rounded-full w-8 h-8 flex items-center justify-center">
        <BiSolidUser className="text-xl text-[#4C4C4C]" />
      </div>

      <Link href={"/auth/login"}>Entre / Cadastre-se</Link> 
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