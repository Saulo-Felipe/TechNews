import { BiSolidUser } from "react-icons/bi";

export async function User() {

  await new Promise(resolve => setTimeout(resolve, 4000));

  return (
    <div className="flex items-center gap-2">
      <div>Entre / Cadastre-se</div> 
      <BiSolidUser className="text-2xl" />
    </div>
  );
}