import { Category } from "@/types/GeneralTypes";
import { Suspense } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CategoriesProps {
  className?: string;
}

export async function Categories({ className }: CategoriesProps) {
  try {
    const fetchResponse = await fetch(`${process.env["backend_url"]}/category?limit=5`, {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24 // 24 hours 
      }
    });
    const categories: Category[] = await fetchResponse?.json() || [];

    return (
      <Suspense fallback={<Loading />}>
        <nav className={twMerge("flex gap-3 mobile:hidden items-center", className)}>
          {
            categories.map(({name, id}) => 
              <Link key={id} href={`/category/${name}`}>
                {name[0].toUpperCase()+name.slice(1)}
              </Link>
            )
          }
        </nav>
        
      </Suspense>
    );
  } catch(e) {
    return <Loading />
  }

}


function Loading() {
  return (
    <>
      {
        [1, 2, 3, 4].map(i => 
          <span key={i} className="animate-pulse bg-gray-800 w-20 h-6 rounded-md"/>
        )
      }
    </>
  );
}
