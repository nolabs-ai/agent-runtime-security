import { Edge, Node, Svg, Zone } from "./kit";

export function FrontDiagram() {
  return (
    <Svg w={760} h={430} label="High-level architecture: inside a governed execution domain, a trusted runtime holds each untrusted agent, tool and generated-code context in its own isolated cell, with credentials kept in a broker outside those cells. Enterprise governance provides policy, evidence is retained outside the agents, and policy can be expanded without a restart.">
      <Node x={10} y={10} w={250} h={72} title="Enterprise governance" lines={["policy · approvals · revocation"]} />
      <Node x={300} y={10} w={250} h={72} title="Evidence retention" lines={["signed records · retention"]} kind="evidence" />

      <Zone x={10} y={125} w={550} h={295} />
      <text x={26} y={408} className="d-label">OUTER ISOLATION BOUNDARY · VM, MICROVM OR DEDICATED HOST</text>

      <Zone x={30} y={150} w={510} h={245} kind="zone-trusted" />
      <text x={48} y={178} className="d-title">Trusted runtime</text>
      <text x={48} y={198} className="d-sub">supervisor · evidence writer</text>
      <text x={522} y={178} textAnchor="end" className="d-label">INNER BOUNDARIES · PROCESS ISOLATION</text>

      <Node x={45} y={218} w={150} h={82} title="Agent" lines={["per-agent policy,", "scoped capability"]} kind="untrusted" />
      <Node x={210} y={218} w={150} h={82} title="Tool" lines={["invocation-scoped,", "bounded execution"]} kind="untrusted" />
      <Node x={375} y={218} w={150} h={82} title="Generated code" lines={["constrained,", "no ambient access"]} kind="untrusted" />

      <Node x={45} y={322} w={480} h={60} title="Credential broker" lines={["phantom credentials · upstream secrets"]} kind="trusted" />

      <Node x={590} y={150} w={160} h={92} title="Policy expansion" lines={["bounded grants"]} />

      <Edge kind="ctrl" d="M135 82 L135 148" />
      <Edge kind="evid" d="M425 150 L425 84" />
      <Edge kind="ctrl" d="M588 196 L542 196" />
    </Svg>
  );
}
