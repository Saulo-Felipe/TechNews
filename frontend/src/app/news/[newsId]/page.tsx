import { NewsCarouselGroup } from "@/components/NewsGroups/CarouselGroup";
import { NewsWithUserAndTag } from "@/types/GeneralTypes";
import htmlParser from "html-react-parser";
import { Metadata } from "next";

export async function generateMetadata({ 
  params, 
}: {
  params: { newsId: number },
}): Promise<Metadata> { 
  const newsData: NewsWithUserAndTag = 
    await fetch(`${process.env["backend_url"]}/news/get-one/${params.newsId}`)
      .then(resp => resp.json());

  return {
    title: `TechNews - ${newsData.title}`,
    description: newsData.excerpt
  };
}

export default async function NewsPage({ params }: {params: { newsId: number }}) {
  const newsData: NewsWithUserAndTag = 
    await fetch(`${process.env["backend_url"]}/news/get-one/${params.newsId}`)
      .then(resp => resp.json());

  // Add view
  await fetch(`${process.env["backend_url"]}/news/add-view/${params.newsId}`, {
    method: "POST",
    cache: "reload"
  });


  return (
    <div className="bg-white py-14 px-72 text-neutral-700">
      <h1 className="text-4xl font-bold">{newsData.title}</h1>
      
      <p className="flex flex-col text-sm py-4">
        <span>Por <strong>{newsData.user.username}</strong></span>
        <span>Em <strong>{newsData.publicationDate}</strong></span>
      </p>

      <hr />

      <p className="my-2 text-xl">{newsData.excerpt}</p>

      <img className="my-4 mb-8" src={newsData.cover_image_url+"&w=1220"} />

      {/* content */}
      
      <div id="news-content">
        {htmlParser(newsData.content.replaceAll("CNN", "TechNews"))}
      </div>

      <div className="border border-neutral-300 rounded-md p-2 px-4 flex items-center mt-4">
        <div className="font-bold mr-2">Tags: </div>

        <div className="flex items-center gap-2">
          {
            newsData.tags.map((tag, i) => 
              <p key={tag.id}>
                <a 
                  href={`#${tag.id}`}
                >{tag.name}</a>
                
                {i < newsData.tags.length-1 ? ", " : "."}
              </p>
            )
          }
        </div>
      </div>
      
      <NewsCarouselGroup 
        groupTitle="Notícias Relacionadas" 
        type="related-tags" 
        tags={newsData.tags.map(e => e.name)} 
      />
    </div>
  );
}