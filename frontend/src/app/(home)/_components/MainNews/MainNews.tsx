import { NewsPreview } from "@/types/GeneralTypes";
import { Card } from "./Card";
import { twMerge } from "tailwind-merge";
import { Suspense } from "react";


async function MainNews() {
  const response = await fetch(`${process.env["backend_url"]}/news/preview/random?limit=3`);
  const allNews: NewsPreview[] = await response.json();
  
  return (
    <div className={
      twMerge(
        "mt-10 flex gap-2 h-[70vh] smartphone:flex-col", 
        allNews.length === 0 ? "animate-pulse" : ""
      )}
    >
      <Card 
        cardPadding="p-8"
        titleSize="text-3xl"
        {...allNews[0]}
      />      

      <div className="flex-1 flex flex-col gap-2">
        <Card 
          cardPadding="p-6"
          titleSize="text-3xl"
          {...allNews[1]}
        />   

        <Card 
          cardPadding="p-6"
          titleSize="text-3xl"
          {...allNews[2]}
        />   
      </div>
    </div>
  );
}



function MainNewsLoading() {

  return (
    <Suspense fallback={
      <div className={"mt-10 flex gap-2 h-[70vh] smartphone:flex-col animate-pulse"}>
        <Card 
          cardPadding="p-8"
          titleSize="text-3xl"
          cover_image_url="" excerpt="" id={1} title=""
        />      
  
        <div className="flex-1 flex flex-col gap-2">
          <Card 
            cardPadding="p-6"
            titleSize="text-3xl"
            cover_image_url="" excerpt="" id={1} title=""
          />   
  
          <Card 
            cardPadding="p-6"
            titleSize="text-3xl"
            cover_image_url="" excerpt="" id={1} title=""
          />   
        </div>
      </div>
    }>
      <MainNews />
    </Suspense>
  );
}


export { MainNewsLoading as MainNews };