interface CardProps {
  title: string;
  subTitle?: string;
  imageURL: string;
  cardPadding: string;
  titleSize: string;
}

export function Card({ imageURL, cardPadding, titleSize, subTitle, title }: CardProps) {

  return (
    <div className="flex-1 flex items-end border-spacing-3 group relative overflow-hidden">
      <div
        className="
          group-hover:scale-110 news-image w-full h-full bg-no-repeat bg-cover bg-center 
          absolute transition -z-10
        "
        style={{backgroundImage: `url(${imageURL})`}}
      />
      <div className="w-full h-full absolute -z-10 bg-[radial-gradient(transparent,rgb(0,0,0,0.8))]" />

      <div className={`${cardPadding} text-white`}>
        <div className="py-2">{subTitle}</div>
        <div className={`font-bold ${titleSize}`}>{title}</div>
      </div>
    </div>    
  );
}