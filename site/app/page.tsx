import { getChapters } from "@/lib/chapters";
import { SITE } from "@/lib/site";
import { FrontDiagram } from "@/components/figures/FrontDiagram";

export default function Home() {
  const chapters = getChapters();
  const abstractSeg = chapters.find((c) => c.slug === "abstract")!.section.segments[0];
  const abstract = abstractSeg.type === "md" ? abstractSeg.text.split("\n\n")[0].split(/(?<=\.)\s/)[0] : "";

  return (
    <>
      <section className="front">
        <div className="wrap front-in">
          <div className="front-copy">
            <h1>{SITE.title}</h1>
            <p className="front-abstract">{abstract}</p>
          </div>
          <div className="front-art">
            <FrontDiagram />
          </div>
        </div>
      </section>
    </>
  );
}
