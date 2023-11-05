import { NewsPreview } from "@/types/GeneralTypes";
import { Card } from "./_components/Card";
import { SearchBar } from "./_components/SearchBar";
import { Metadata } from "next";


interface SearchNewsPreview extends NewsPreview {
  category: {
    name: string;
  };
  createdAt: string;
}


export async function generateMetadata({
  params: {searchQuery}
}: {
  params: {searchQuery: string}
}): Promise<Metadata> {

  return {
    title: `TechNews - Resultados para "${searchQuery}"`
  };
}


export default async function SearchPage({params: {searchQuery}}: {params: {searchQuery: string}}) {
  searchQuery = decodeURIComponent(searchQuery);

  const newsData: SearchNewsPreview[] = await fetch(`${process.env["backend_url"]}/news/search/${searchQuery}`)
    .then(resp => resp.json());
  
  await new Promise(resolve => setTimeout(resolve, 50000));

  return (
    <div className="px-desktop py-8 flex flex-col gap-4 mb-10">
      <SearchBar initialState={searchQuery} />

      {
        newsData.map(news => 
          <Card 
            {...news}
            key={news.id}
            category={news.category.name}
          />
        )
      }
    </div>
  );
}

