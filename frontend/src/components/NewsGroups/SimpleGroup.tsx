import { NewsWithUserAndTag } from "@/types/GeneralTypes";
import { NewsCard } from "./Card";
import { Title } from "./Title";

export interface NewsGroupProps {
  type: "random" | "latest";
  groupTitle: string;
}

export async function SimpleNewsGroup({ type, groupTitle }: NewsGroupProps) {
  const fetchNews = await fetch(`${process.env["backend_url"]}/news/preview/${type}?limit=4`);
  const newsData: NewsWithUserAndTag[] = await fetchNews.json();

  console.log(newsData);

  return (
    <div className="pt-10 flex flex-col gap-4">
      <Title title={groupTitle} link="#" />

      {
        newsData.length > 0 ? (
          <div className="flex items-start gap-4 smartphone:flex-col smartphone:gap-6">
            {
              newsData.map(item => 
                <NewsCard 
                  key={item.id} 
                  width="w-full" 
                  imageUrl={item.cover_image_url}   
                  {...item} 
                />
              )
            }
          </div>    
        ) : (
          <div className="pl-3">Nenhuma notícia disponível nessa seção</div>
        )
      }
    </div>
  );
}