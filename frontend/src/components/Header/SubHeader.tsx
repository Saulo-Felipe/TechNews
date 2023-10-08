import { AiOutlineCloud } from "react-icons/ai";

export function SubHeader() {

  return (
    <div className="bg-[#454545] px-24 py-1 text-[0.75rem] flex items-center justify-between">
      <div className="flex-[0.3] flex items-center gap-2">
        <AiOutlineCloud className="w-6 h-6" />
        <div>14º Campina Grande - PB</div>
      </div>
      
      <div className="flex-[0.3] text-center">Segunda, 04 de outubro de 2023</div>
      <div className="flex-[0.3]"></div>
    </div>
  );
}