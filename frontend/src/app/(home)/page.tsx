import { NewsCarouselGroup } from "@/components/NewsGroups/CarouselGroup";
import { MainNews } from "./_components/MainNews/MainNews";
import { News, NewsGroup } from "@/components/NewsGroups/Group";

export default function Home() {

  const fakeNews: News[] = [
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      id: 21,
      imageUrl: "/images/example-3.jpg",
      title: "Cachorro em new york, mito ou fake?",
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      id: 22,
      imageUrl: "/images/example-2.jpeg",
      title: "Porque as borboletas estão desaparecendo ao redor do planeta?",
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      id: 23,
      imageUrl: "/images/example-1.webp",
      title: "Porque as borboletas estão desaparecendo ao redor do planeta?",
    }
  ];

  return (
    <div className="px-desktop-container pb-32">
      <MainNews />

      <NewsGroup groupLink="#" groupTitle="Últimas Notícias" news={fakeNews} />
      <NewsCarouselGroup groupLink="#" groupTitle="Mais Acessadas" news={[...fakeNews, ...fakeNews, ...fakeNews]} />
    </div>
  );
}