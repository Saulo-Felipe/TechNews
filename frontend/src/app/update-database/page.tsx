"use client";
import { Button } from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { BsDatabase } from "react-icons/bs";
import { io, Socket } from "socket.io-client";


interface Log {
  status: "info" | "success" | "error";
  message: string;
}

export default function UpdateDatabase() {
  const socketRef = useRef<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  async function handleStartUpdate() {
    setIsLoading(true);

    await fetch(`${process.env["NEXT_PUBLIC_BACKEND_URL"]}/scraper/update-categories`, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    const socket = io(String(process.env["NEXT_PUBLIC_BACKEND_URL"]));

    socket.on("new-message", (message: Log) => {
      setLogs(prevState => [...prevState, message])
    });
  }, []);

  return (
    <div className="px-72 pt-10 pb-32 bg-white">
      <h1 className="flex items-center mb-2 font-bold text-3xl">
        <BsDatabase />
        Atualizar banco de dados
      </h1>

      <hr />

      <div className="flex mt-8 gap-6">
        <div className="flex flex-col flex-[0.5]">
          <select 
            className="bg-[#F7F7F7] border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={"cnn"}>
            <option disabled>Selecione uma plataforma para importar os dados</option>
            <option value={"cnn"} className="text-red">CNN Brasil</option>
          </select>

          <div className="overflow-hidden mt-4 relative rounded-2xl 
            border bg-[#F7F7F7] w-full h-80 border-gray-300">
            <span className="absolute right-0 bg-[#D9D9D9] p-4 rounded-se-2xl rounded-es-2xl select-none">Logs</span>

            <div className="h-full p-3 overflow-scroll">
              {
                logs.map((log, i) => <div
                  key={i}
                  className={`${
                    log.status == "success" 
                    ? "text-green-500"
                    : log.status == "error" 
                      ? "text-red-500"
                      : ""
                    }`
                  }>{log.message}</div>
                )
              }
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              loading={isLoading}
              onClickAction={handleStartUpdate} 
              className="mt-4">Atualizar Notícias</Button>

            <Button 
              loading={isLoading}
              onClickAction={handleStartUpdate} 
              className="mt-4">Atualizar Categorias</Button>              
          </div>
        </div>

        <span className="bg-slate-300 w-[1px]" />

        <div className="flex-[0.5]">
          <div className="font-semibold text-lg">Últimas atualizações</div>
          
          <div className="border flex bg-[#F7F7F7] rounded-md w-max mt-5">
            <span className="p-3">21/10/2023 ás 13:45</span>
            <span className="w-[1px] bg-slate-200" />
            <span className="p-3 text-green-500">+20 novas notícias</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}