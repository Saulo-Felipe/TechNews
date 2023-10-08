import Image from "next/image";
import { HomeNewsCard } from "./HomeNewsCard";

export function MainNewsSection() {


  return (
    <section className="flex border h-[65vh] gap-2">

      <HomeNewsCard
        className="flex-[0.5]"
        type="large"
      />

      <div className="flex-[0.5] border gap-2 flex flex-col">
        <div className="flex border gap-2 flex-[0.5]">
          <HomeNewsCard
            className="gap-2"
            type="small"
          />
          <HomeNewsCard
            className="gap-2"
            type="small"
          />
        </div>

        <HomeNewsCard
          className="gap-2"
          type="medium"
        />
      </div>

    </section>
  );
}