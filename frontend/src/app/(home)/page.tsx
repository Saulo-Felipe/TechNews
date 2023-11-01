import { NewsCarouselGroup } from "@/components/NewsGroups/Carousel/CarouselGroup";
import { MainNews } from "./_components/MainNews/MainNews";
import { SimpleNewsGroup } from "@/components/NewsGroups/SimpleGroup";

export default function HomePage() {  

  return (
    <div className="px-desktop min-h-[100vh] pb-32 tablet:px-tablet smartphone:px-smartphone">
      <MainNews />

      <SimpleNewsGroup groupTitle="Últimas Notícias" type="random" />
      <NewsCarouselGroup groupTitle="Mais Acessadas" type="most-accessed" />
    </div>
  );
}