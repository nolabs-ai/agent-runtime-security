import { FigureFrame } from "./FigureFrame";
import { Markdown } from "./Markdown";
import { Topology } from "./figures/Topology";
import { ConstrainedExec } from "./figures/ConstrainedExec";
import { GrantSequence } from "./figures/GrantSequence";
import { Federation } from "./figures/Federation";
import { InfoFlow } from "./figures/InfoFlow";

const TITLES: Record<number, string> = {
  1: "Architecture overview",
  2: "Runtime governance topology",
  3: "Generated-code execution",
  4: "Runtime grant expansion",
  5: "Federated delegation",
  6: "Information flow and release",
};

export function Figure({ n, label, caption }: { n: number; label: string; caption: string }) {
  const title = label ? label.replace(/\.$/, "") : TITLES[n];
  const cap = <Markdown inline>{caption}</Markdown>;

  if (n === 1) {
    return (
      <FigureFrame
        n={1}
        title={title}
        legend={false}
        paper
        caption={cap}
        actions={
          <span className="fig-actions">
            <a href="/diagrams/overview.svg" target="_blank" rel="noreferrer">Standalone vector</a>
            <a href="/diagrams/overview.pdf" target="_blank" rel="noreferrer">Print version</a>
          </span>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diagrams/overview.svg"
          alt="Agent runtime governance overview showing enterprise services above separate agent, tool, and generated-code sandboxes, with a trusted local runtime enforcing resource access and producing protected evidence."
          className="fig-img"
          loading="lazy"
        />
      </FigureFrame>
    );
  }

  const body =
    n === 2 ? <Topology /> :
    n === 3 ? <ConstrainedExec /> :
    n === 4 ? <GrantSequence /> :
    n === 5 ? <Federation /> :
    <InfoFlow />;

  return (
    <FigureFrame n={n} title={title} legend={n !== 4} caption={cap}>
      {body}
    </FigureFrame>
  );
}
