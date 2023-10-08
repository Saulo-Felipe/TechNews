import Image from "next/image";

interface HomeNewsCardProps {
  type: "small" | "medium" | "large";
  className?: string;
}

export function HomeNewsCard({className, type}: HomeNewsCardProps) {
  const TitleFontSize = type === "large"
    ? "text-3xl"
    : type === "medium"
      ? "text-2xl"
      : "text-xl";

  const TitlePadding = type === "large"
    ? "p-8"
    : "p-4";

  return (
    <div className={`${className}
      flex-[0.5] flex items-end border overflow-hidden transition cursor-pointer relative
      hover:[&_.news-image]:scale-110
    `}>
      <div className={`
        bg-gradient-to-t from-black w-full via-[rgb(0,0,0,0.7)] text-white ${TitlePadding} pt-12 z-10`
      }>
        <div>Subtitulo Aqui tambem</div>
        <div className={`${TitleFontSize} font-bold`}>Alguma Noticia </div>
      </div>
      
      <div className={`news-image
        bg-[url("https://www.pontotel.com.br/wp-content/uploads/2022/05/imagem-corporativa.jpg")]        
        top-0 bottom-0 w-full absolute bg-[cover] bg-center transition bg-no-repeat
      `}></div>
      {/* <Image
        src="https://www.pontotel.com.br/wp-content/uploads/2022/05/imagem-corporativa.jpg"
        alt="bg fundo"
        className="transition absolute"
        fill
      /> */}
    </div>
  );
}