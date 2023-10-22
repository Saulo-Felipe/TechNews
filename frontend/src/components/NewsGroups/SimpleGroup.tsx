import { NewsCard } from "./Card";
import { Title } from "./Title";


export interface News {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  rankingPosition?: number;
}


export interface NewsGroupProps {
  groupTitle: string;
  groupLink: string;
  news: News[];
}

export function NewsGroup({news, groupTitle, groupLink}: NewsGroupProps) {

  return (
    <div className="pt-10 flex flex-col gap-4">
      <Title title={groupTitle} link={groupLink} />

      <div className="flex items-start gap-4 smartphone:flex-col smartphone:gap-6">
        {
          news.map(item => <NewsCard key={item.id} width="w-full" {...item} />)
        }
      </div>
    </div>
  );
}