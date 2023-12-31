import { NewsCard } from "../Card";
import { NewsGroupProps } from "../SimpleGroup";
import { Title } from "../Title";
import { NewsPreview } from "@/types/GeneralTypes";
import { CarouselControl } from "./CarouselControl";
import { Suspense } from "react";


export async function NewsCarouselGroup({ 
  groupTitle, 
  type, 
  ranking,
  category 
}: NewsGroupProps) {
  
  try {
    let params = `/news/preview/${type}`;

    if (type === "category") {
      params = `/news/category/${category}`;
    }
    
    const fetchNews = await fetch(`${process.env["backend_url"] + params}`);

    const newsData: NewsPreview[] = await fetchNews?.json() || [];
    
    return (
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    );

  } catch(e) {
    return <Loading />;
  }
}


function Loading() {
  return (
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
  )
}