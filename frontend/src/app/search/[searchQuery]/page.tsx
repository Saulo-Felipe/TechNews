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

  return (
    <div className="px-desktop py-8 flex flex-col gap-4 mb-10 smartphone:px-smartphone tablet:px-tablet">
      <SearchBar initialState={searchQuery} />

      {
        newsData.length > 0
          ? newsData.map(news =>
            <Card
              {...news}
              key={news.id}
              category={news.category.name}
            />
          )
          : (
            <div className="bold text-center text-2xl min-h-[70vh]">
              Nenhuma notícia encontrada para "{searchQuery}"
            </div>
          )
      }
    </div>
  );
}

