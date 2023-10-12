import { Card } from "./Card";

export function MainNews() {


  return (
    <div className="mt-10 flex gap-2 h-[70vh] smartphone:flex-col">
      <Card 
        cardPadding="p-8"
        imageURL="/images/example-1.webp"
        subTitle="Veja o motivo estranho do desaparecimento"
        title="Porque as borboletas estão desaparecendo ao redor do planeta?"
        titleSize="text-3xl"
      />      

      <div className="flex-1 flex flex-col gap-2">
        <Card 
          cardPadding="p-5"
          imageURL="/images/example-2.jpeg"
          subTitle="Veja o motivo estranho do desaparecimento"
          title="Porque as borboletas estão desaparecendo ao redor do planeta?"
          titleSize="text-2xl"
        />

        <Card 
          cardPadding="p-5"
          imageURL="/images/example-3.jpg"
          subTitle="Veja o motivo estranho do desaparecimento"
          title="Cachorro em new york, mito ou fake?"
          titleSize="text-2xl"
        />  
      </div>
    </div>
  );
}