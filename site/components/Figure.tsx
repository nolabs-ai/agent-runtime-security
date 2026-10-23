import { FigureFrame } from "./FigureFrame";
import { Markdown } from "./Markdown";
import { Topology } from "./figures/Topology";
import { TokenStream } from "./figures/TokenStream";
import { BlastRadius } from "./figures/BlastRadius";
import { ConstrainedExec } from "./figures/ConstrainedExec";
import { CredentialBroker } from "./figures/CredentialBroker";
import { LabelPropagation } from "./figures/LabelPropagation";
import { ProtocolAdapter } from "./figures/ProtocolAdapter";
import { ToolBrokering } from "./figures/ToolBrokering";
import { GrantSequence } from "./figures/GrantSequence";
import { Federation } from "./figures/Federation";
import { InfoFlow } from "./figures/InfoFlow";

const TITLES: Record<number, string> = {
  1: "A single token stream",
  2: "Blast radius of a prompt injection",
  3: "Runtime governance topology",
  4: "Generated-code execution",
  5: "HTTP credential brokering",
  6: "Protocol-aware brokering",
  7: "Brokered tool execution",
  8: "Runtime grant changes",
  9: "Federated delegation",
  10: "Label propagation",
  11: "Information flow and release",
};

export function Figure({ n, label, caption }: { n: number; label: string; caption: string }) {
  const title = label ? label.replace(/\.$/, "") : TITLES[n];
  const cap = <Markdown inline>{caption}</Markdown>;

  const body =
    n === 1 ? <TokenStream /> :
    n === 2 ? <BlastRadius /> :
    n === 3 ? <Topology /> :
    n === 4 ? <ConstrainedExec /> :
    n === 5 ? <CredentialBroker /> :
    n === 6 ? <ProtocolAdapter /> :
    n === 7 ? <ToolBrokering /> :
    n === 8 ? <GrantSequence /> :
    n === 9 ? <Federation /> :
    n === 10 ? <LabelPropagation /> :
    <InfoFlow />;

  return (
    <FigureFrame n={n} title={title} legend={n > 2 && n !== 8} caption={cap}>
      {body}
    </FigureFrame>
  );
}
