import { News } from "@/types/GeneralTypes";
import { Card } from "./Card";


export async function MainNews() {
  const response = await fetch(`${process.env["backend_url"]}/news/random?limit=3`);
  const allNews: News[] = await response.json();


  return (
    <div className="mt-10 flex gap-2 h-[70vh] smartphone:flex-col">

      <Card 
        cardPadding="p-8"
        imageURL={allNews[0]?.cover_image_url.split("w=")[0]}
        subTitle={allNews[0]?.excerpt}
        title={allNews[0]?.title}
        titleSize="text-3xl"
      />      

      <div className="flex-1 flex flex-col gap-2">
        <Card 
          cardPadding="p-8"
          imageURL={allNews[1]?.cover_image_url}
          subTitle={allNews[1]?.excerpt}
          title={allNews[1]?.title}
          titleSize="text-3xl"
        />   

        <Card 
          cardPadding="p-8"
          imageURL={allNews[2]?.cover_image_url}
          subTitle={allNews[2]?.excerpt}
          title={allNews[2]?.title}
          titleSize="text-3xl"
        />   
      </div>
    </div>
  );
}