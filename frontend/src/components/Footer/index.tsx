import Image from "next/image";
import Link from "next/link";
import { LinksContainer } from "./LinksContainer";
import { Category } from "@/types/GeneralTypes";

export async function Footer() {
  const fetchResponse = await fetch(`${process.env["backend_url"]}/category?limit=20`, {
    method: "GET",
    next: {
      revalidate: 60 // 1 min 
    }
  });
  const categories: Category[] = await fetchResponse?.json() || [];

  return (
    <footer className="bg-black text-white">
      <div className="flex px-desktop py-8 gap-12 smartphone:px-smartphone 
      tablet:px-tablet smartphone:flex-wrap">
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            src={"/images/logotipo.png"}
            alt="logotipo da technews"
            className="smartphone:w-14"
          />
        </Link>

        <LinksContainer 
          title="Categorias 1"
          links={categories.slice(0, 5).map(item => ({ 
            content: item.name, 
            url: `/category/${item.name}`
          }))}
        />

        <LinksContainer
          title="Páginas"
          links={[
            {url: "/", content: "Home"},
            {url: "/auth/login", content: "Login"},
            {url: "/", content: "Cadastre-se"},
            {url: "/createnews", content: "Criar Noticia"}
          ]}
        />

        <LinksContainer 
          title="Categorias 2"
          links={categories.slice(5, 10).map(item => ({ 
            content: item.name, 
            url: `/category/${item.name}`
          }))}
        />

        <LinksContainer 
          title="Categorias 3"
          links={categories.slice(10, 15).map(item => ({ 
            content: item.name, 
            url: `/category/${item.name}`
          }))}
        />

        <LinksContainer 
          title="Categorias 4"
          links={categories.slice(15, 20).map(item => ({ 
            content: item.name, 
            url: `/category/${item.name}`
          }))}
        />
      </div>

      <div className="text-[#979797] text-center p-4 border-t border-[#5B5B5B]">© 2023 - TechNews {"(Saulo Felipe)"}</div>
    </footer>
  );
}