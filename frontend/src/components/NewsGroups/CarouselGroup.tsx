import { NewsCard } from "./Card";
import { NewsGroupProps } from "./Group";
import { Title } from "./Title";

export function NewsCarouselGroup({ groupLink, groupTitle, news}: NewsGroupProps) {

  return (
    <div className="pt-10 flex-col flex gap-4">
      <Title title={groupTitle} link={groupLink} />

      <div className="border border-red-500 overflow-auto">
        <div className="w-max flex">
          {
            news.map(item => <NewsCard width="w-72" key={item.id} {...item} />)
          }
        </div>
      </div>
    </div>    
  );
}