import { NewsCarouselGroup } from "@/components/NewsGroups/Carousel/CarouselGroup";
import { NewsWithUserAndTag } from "@/types/GeneralTypes";
import htmlParser from "html-react-parser";


export default async function NewsPage({ params }: {params: { newsId: number }}) {
  const newsFetch = await fetch(`${process.env["backend_url"]}/news/get-one/${params.newsId}`);
  const newsData: NewsWithUserAndTag = await newsFetch.json();

  // Add view
  await fetch(`${process.env["backend_url"]}/news/add-view/${params.newsId}`, {
    method: "POST",
    cache: "reload"
  });

  return (
    <div className="bg-white py-14 px-72 text-neutral-700">
      <h1 className="text-3xl font-bold">{newsData.title}</h1>
      
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
            newsData.tags.map(tag => 
              <p key={tag.id}>
                <a 
                  href={`#${tag.id}`}
                >{tag.name}</a>
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