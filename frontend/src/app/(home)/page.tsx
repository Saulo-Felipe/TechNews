import { NewsCarouselGroup } from "@/components/NewsGroups/CarouselGroup";
import { MainNews } from "./_components/MainNews/MainNews";
import { NewsGroup } from "@/components/NewsGroups/SimpleGroup";
import { News } from "@/types/GeneralTypes";

export default async function Home() {  
  const latestNewsFetch = await fetch(`${process.env["backend_url"]}/news/random?limit=4`, {cache: "no-cache"});
  const latestNewsData: News[] = await latestNewsFetch.json();

  const newsRankingFetch = await fetch(`${process.env["backend_url"]}/news/most-accessed`, {cache: "no-cache"});
  const newsRankingData: News[] = await newsRankingFetch.json();

  return (
    <div className="px-desktop pb-32 tablet:px-tablet smartphone:px-smartphone">
      <MainNews />

      <NewsGroup groupLink="#" groupTitle="Últimas Notícias" news={latestNewsData} />
      <NewsCarouselGroup groupLink="#" groupTitle="Mais Acessadas" news={newsRankingData} />
    </div>
  );
}