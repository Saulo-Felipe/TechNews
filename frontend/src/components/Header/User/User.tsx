import { BiSolidUser } from "react-icons/bi";

export async function User() {

  // await new Promise(resolve => setTimeout(resolve, 4000));

  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#121212] rounded-full w-8 h-8 flex items-center justify-center">
        <BiSolidUser className="text-xl text-[#4C4C4C]" />
      </div>

      <div className="">Entre / Cadastre-se</div> 
    </div>
  );
}