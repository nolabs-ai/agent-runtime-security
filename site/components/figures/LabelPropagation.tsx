import { Edge, Node, Svg, Zone } from "./kit";

export function LabelPropagation() {
  return (
    <Svg w={1000} h={500} label="Label propagation: sources receive labels by origin, such as untrusted web content, restricted customer records and trusted operator configuration. Labels merge in the agent context, taking the most restrictive confidentiality and the least trusted integrity. Outputs such as tool results, files, memory and messages inherit those labels. At the sinks, the runtime control system checks confidentiality before release to a destination and integrity before a consequential action.">
      <text x={20} y={32} className="d-label">SOURCES · LABELED BY ORIGIN</text>
      <Node x={20} y={60} w={230} h={90} title="Web page" lines={["integrity: untrusted"]} kind="untrusted" />
      <Node x={20} y={190} w={230} h={90} title="Customer records" lines={["confidentiality: restricted"]} />
      <Node x={20} y={320} w={230} h={90} title="Operator configuration" lines={["integrity: trusted"]} kind="trusted" />

      <Node x={340} y={140} w={280} h={230} title="Agent context" lines={["accumulates the labels:", "untrusted and restricted", "", "merge takes the most restrictive", "confidentiality and the least", "trusted integrity"]} kind="untrusted" />
      <Node x={340} y={400} w={280} h={80} title="Derived outputs" lines={["tool results, files, memory and", "messages inherit the labels"]} />

      <Zone x={700} y={30} w={280} h={420} kind="zone-trusted" label="ENFORCED BY THE CONTROL SYSTEM" />
      <Node x={720} y={70} w={240} h={100} title="Release to destination" lines={["confidentiality label and", "destination policy decide"]} kind="trusted" />
      <Node x={720} y={200} w={240} h={100} title="Consequential action" lines={["untrusted integrity label:", "deny or require approval"]} kind="trusted" />

      <Edge d="M250 105 L295 105 L295 190 L338 190" label="labeled|by origin" lx={296} ly={44} />
      <Edge d="M250 235 L338 235" />
      <Edge d="M250 365 L295 365 L295 290 L338 290" />
      <Edge d="M480 370 L480 398" label="inherit" lx={492} ly={388} anchor="start" />
      <Edge d="M620 190 L665 190 L665 120 L718 120" />
      <Edge d="M620 290 L665 290 L665 250 L718 250" />
    </Svg>
  );
}
