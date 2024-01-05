import { NewsPreview } from "@/types/GeneralTypes";
import { Card } from "./_components/Card";
import { Metadata } from "next";
import { Title } from "./_components/Title";


interface CategoryNewsPreview extends NewsPreview {
  category: {
    name: string;
  };
  createdAt: string;
}

interface CategoryPageParams {
  params: {
    category: string
  }
}

export async function generateMetadata({
  params: {category}
}: CategoryPageParams): Promise<Metadata> {

  return {
    title: `TechNews - Categoria "${category}"`
  };
}

export default async function CategoryPage({params: { category }}: CategoryPageParams) {
  category = decodeURIComponent(category);

  const newsData: CategoryNewsPreview[] = await fetch(`${process.env["backend_url"]}/news/category/${category}`, {
    next: {
      revalidate: 0
    }
  })
    .then(resp => resp.json());

  return (
    <div className="px-desktop py-8 flex flex-col gap-4 mb-10 smartphone:px-smartphone tablet:px-tablet">
      <Title category={category} />

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
              Nenhuma notícia encontrada para categoria "{category}"
            </div>
          )
      }
    </div>
  );
}

