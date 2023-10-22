import Link from "next/link";

interface LinksContainerProps {
  title: string;
  links: {
    url: string, 
    content: string
  }[];
}

export function LinksContainer({title, links}: LinksContainerProps) {

  return (
    <div>
      <div className="border-l-2 border-default-red pl-3 font-bold mb-3">{title}</div>
      <div className="border-l-2 border-transparent pl-3 flex flex-col">
        {
          links.map((link, i) => 
            <Link 
              key={i} 
              href={link.url}
              className="py-2"
            >
              {link.content}
            </Link>
          )
        }
      </div>
    </div>
  );
}