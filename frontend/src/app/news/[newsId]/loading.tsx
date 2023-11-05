import { twMerge } from "tailwind-merge";

export default function Loading() {

  return (
    <div className="bg-white py-14 px-72 text-neutral-700">
      <h1 className="text-4xl font-bold bg-slate-300 rounded-md text-transparent animate-pulse w-max">
        {"Carregando Titulo da noticia..."}
      </h1>
      
      <p className="flex flex-col text-sm py-4">
        {
          ["Por", "Em"].map((item, i) => 
            <span key={i}>
              {item}
              <strong className="ml-2 bg-slate-300 rounded-md text-transparent animate-pulse w-max">
                {"Carregando..."}
              </strong>
            </span>
          )
        }
      </p>

      <hr />

      <p className="my-2 text-xl bg-slate-300 rounded-md text-transparent animate-pulse">
        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
      </p>
      
      <div className="w-full h-96 bg-slate-300 rounded-md text-transparent animate-pulse" />

      {/* content */}
      
      <div id="news-content">
        {
          [1, 2, 3, 4].map(item => {
            const random = Math.floor(Math.random()*20+1);
            const width = `w-[${random}rem]`;

            return <div key={item} className={twMerge(width, "h-8 bg-slate-300 rounded-md text-transparent animate-pulse mt-2")}>Carregando....</div>;
          })
        }
      </div>

      <div className="border border-neutral-300 rounded-md p-2 px-4 flex items-center mt-4">
        <div className="font-bold mr-2">Tags: </div>

        <div className="flex items-center gap-2">
          {
            [1, 2, 3, 4, 5].map((item) => 
              <span key={item} className="ml-2 bg-slate-300 rounded-md text-transparent animate-pulse w-max">
                {"Carregando..."}
              </span>
            )
          }
        </div>
      </div>
    </div>
  );
}