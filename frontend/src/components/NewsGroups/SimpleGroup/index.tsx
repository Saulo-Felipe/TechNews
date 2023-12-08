import { NewsPreview } from "@/types/GeneralTypes";
import { NewsCard } from "../Card";
import { Title } from "../Title";
import { Suspense } from "react";

export interface NewsGroupProps {
  type: "random" | "latest" | "most-accessed" | "related-tags";
  groupTitle: string;

  tags?: string[];
  ranking?: boolean;
}

export async function SimpleNewsGroup({ type, groupTitle }: NewsGroupProps) {
  try {
    const fetchNews = await fetch(`${process.env["backend_url"]}/news/preview/${type}?limit=4`, {
      method: "GET",
      next: {
        revalidate: 60 * 10 // 10 minutes
      }
    });
    const newsData: NewsPreview[] = await fetchNews?.json() || [];
  
    return (
      <Suspense fallback={<Loading />}>
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

    <div className="flex items-start gap-4 smartphone:flex-col smartphone:gap-6">
      {
        new Array(4).fill(1).map((_, i) => 
          <NewsCard 
            loading
            key={i} 
            width="w-full" 
            imageUrl={""} excerpt="" id={i} title="" // unused attributes
          />
        )
      }
    </div>  
  </div>    
  );
}