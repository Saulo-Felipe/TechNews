import { NewsCard } from "../Card";
import { NewsGroupProps } from "../SimpleGroup";
import { Title } from "../Title";
import { NewsPreview } from "@/types/GeneralTypes";
import { CarouselControl } from "./CarouselControl";
import { Suspense } from "react";


async function NewsCarouselGroup({ groupTitle, type, tags, ranking }: NewsGroupProps) {
  if (type === "related-tags") {
    type += `?${new URLSearchParams([["tags", JSON.stringify(tags)]])}`;
  }
  
  const fetchNews = await fetch(
    `${process.env["backend_url"]}/news/preview/${type}`
  );
    
  const newsData: NewsPreview[] = await fetchNews.json();

  

  return (
    <div className="pt-10 flex flex-col gap-4">
      <Title title={groupTitle} link={"#"} />

      {
        newsData.length > 0 ? (
          <div className="relative flex items-center">
            <CarouselControl>
              <div className="w-max flex gap-2">
                {
                  newsData.map((item, i) => 
                    <NewsCard 
                      rankingPosition={ranking ? i+1 : undefined} 
                      width="w-72" 
                      key={i} 
                      imageUrl={item.cover_image_url} 
                      {...item} 
                    />
                  )
                }
              </div>
            </CarouselControl>
          </div> 
        ) : (
          <div className="pl-3">Nenhuma notícia disponível nessa seção</div>
        )
      }
    </div>
  );
}



//--------------------> Loading version
function LoadingNewsCarouselGroup(params: NewsGroupProps) {
  return (
    <Suspense fallback={
      <div className="pt-10 flex flex-col gap-4">
        <Title title={""} link={"#"} loading />
        
        <div className="relative flex items-center">
          <CarouselControl>
            <div className="w-max flex gap-2">
              {
                new Array(10).fill(1).map((_, i) => 
                  <NewsCard 
                    loading
                    width="w-72" 
                    key={i} 
                    imageUrl={""} id={i} excerpt="" title="" // unused attributes
                  />
                )
              }
            </div>
          </CarouselControl>
        </div> 
      </div>
    }>
      <NewsCarouselGroup {...params} />
    </Suspense>
  );
}

export {
  LoadingNewsCarouselGroup as NewsCarouselGroup
};