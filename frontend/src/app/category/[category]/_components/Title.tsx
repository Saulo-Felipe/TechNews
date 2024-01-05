interface TitleProps {
  category: string;
}

export function Title({ category }: TitleProps) {


  return (
    <div className="border-b-[3px] border-default-red w-max text-2xl my-6">
      {category[0].toUpperCase() + category.slice(1)}
    </div>
  );
}