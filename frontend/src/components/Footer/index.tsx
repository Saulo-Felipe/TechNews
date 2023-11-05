import Image from "next/image";
import Link from "next/link";
import { LinksContainer } from "./LinksContainer";

export function Footer() {


  return (
    <footer className="bg-black text-white">
      <div className="flex px-desktop py-8 gap-12">
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
          title="Categorias"
          links={[
            {url: "/", content: "Categoria 1"},
            {url: "/", content: "Categoria 2"},
            {url: "/", content: "Categoria 3"},
            {url: "/", content: "Categoria 4"},
            {url: "/", content: "Categoria 5"},
          ]}
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
          title="Categorias"
          links={[
            {url: "/", content: "Categoria 1"},
            {url: "/", content: "Categoria 2"},
            {url: "/", content: "Categoria 3"},
            {url: "/", content: "Categoria 4"},
            {url: "/", content: "Categoria 5"},
          ]}
        />

        <LinksContainer
          title="Categorias"
          links={[
            {url: "/", content: "Categoria 1"},
            {url: "/", content: "Categoria 2"},
            {url: "/", content: "Categoria 3"},
            {url: "/", content: "Categoria 4"},
            {url: "/", content: "Categoria 5"},
          ]}
        />
      </div>

      <div className="text-[#979797] text-center p-4 border-t border-[#5B5B5B]">© 2023 - TechNews {"(Saulo Felipe)"}</div>
    </footer>
  );
}