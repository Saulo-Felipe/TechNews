import { SearchBar } from "./_components/SearchBar";

export default function Loading() {

  return (
    <div className="px-desktop py-8 flex flex-col gap-4 mb-10">
      <SearchBar initialState={"Carregando..."} />

      {
        [1, 2, 3, 4].map(item => 
          <div key={item} className="flex w-3/4 gap-3">
            <div 
              className="w-80 h-52 bg-slate-300 animate-pulse" 
            />

            <div className="flex-1 mt-1">
              <div className="flex justify-between items-center font-bold">
                <div className="text-transparent bg-slate-300 animate-pulse">Carregando...</div>
                <div className="text-transparent bg-slate-300 animate-pulse">21 de carregando de janeiro</div>
              </div>

              <div className="font-bold my-2 text-lg text-transparent bg-slate-300 animate-pulse">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat magni officia, repellendus non minus iste quo 
              </div>

              <div className="text-[larger] leading-6 text-transparent bg-slate-300 animate-pulse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repudiandae sunt sed magni culpa, vero in fuga quidem! Minus magnam consequatur, dolor nostrum aut labore porro eaque quidem ipsa officiis.</div>
            </div>
          </div>
        )
      }
    </div>
  );
}