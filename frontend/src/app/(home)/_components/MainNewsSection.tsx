import { HomeNewsCard } from "./HomeNewsCard";

export function MainNewsSection() {


  return (
    <section className="flex border h-[65vh] gap-2">

      <HomeNewsCard
        className="flex-[0.5]"
        type="large"
        imageUrl="https://ichef.bbci.co.uk/news/800/cpsprodpb/fc1d/live/c50d3c60-651d-11ee-a63e-af9d23875717.jpg"
      />

      <div className="flex-[0.5] border gap-2 flex flex-col">
        <div className="flex border gap-2 flex-[0.5]">
          <HomeNewsCard
            imageUrl="https://ichef.bbci.co.uk/news/800/cpsprodpb/bfc4/live/b6cf6da0-65d9-11ee-9e82-ad326ec972f2.jpg"
            className="gap-2"
            type="small"
          />
          <HomeNewsCard
            imageUrl="https://s2-g1.glbimg.com/-NmeAtAIcdJYolrmZlz8qt84RRE=/0x0:1024x682/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/u/8/RNWUvPR8ijioKLTFMGpw/000-33xr3z3-1-.jpg"
            className="gap-2"
            type="small"
          />
        </div>

        <HomeNewsCard
          imageUrl="https://ichef.bbci.co.uk/news/800/cpsprodpb/fc1d/live/c50d3c60-651d-11ee-a63e-af9d23875717.jpg"
          className="gap-2"
          type="medium"
        />
      </div>

    </section>
  );
}