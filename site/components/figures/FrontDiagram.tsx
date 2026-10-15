import { Edge, Node, Svg, Zone } from "./kit";

export function FrontDiagram() {
  return (
    <Svg w={760} h={620} label="High-level architecture: inside an outer isolation boundary, a trusted runtime holds the agent, its tools and its generated code in separate inner boundaries, with credentials held by a broker. The agent calls tools and executes generated code. Enterprise governance provides policy, evidence is retained outside the agents, and policy can be expanded at runtime.">
      <Node x={10} y={10} w={215} h={72} title="Enterprise governance" lines={["policy · approvals"]} />
      <Node x={245} y={10} w={215} h={72} title="Artifact admission" lines={["provenance · signatures"]} />
      <Node x={480} y={10} w={250} h={72} title="Evidence retention" lines={["signed records · retention"]} kind="evidence" />

      <Zone x={10} y={125} w={550} h={470} kind="outer" />
      <text x={30} y={580} className="d-label">OUTER BOUNDARY · VM, MICROVM OR DEDICATED HOST</text>

      <Zone x={30} y={155} w={510} h={380} kind="zone-trusted" />
      <text x={50} y={187} className="d-title">Trusted runtime</text>
      <text x={50} y={208} className="d-sub">supervisor · evidence writer</text>
      <text x={520} y={187} textAnchor="end" className="d-label">INNER BOUNDARIES · PROCESS ISOLATION</text>

      <Node x={50} y={235} w={170} h={180} title="Agent" lines={["per-agent policy,", "scoped capability"]} kind="untrusted" />
      <Node x={305} y={235} w={215} h={80} title="Tool" lines={["invocation-scoped,", "bounded execution"]} kind="untrusted" />
      <Node x={305} y={335} w={215} h={80} title="Generated code" lines={["constrained,", "no ambient access"]} kind="untrusted" />

      <Edge d="M220 275 L303 275" label="calls" lx={261} ly={267} />
      <Edge d="M220 375 L303 375" label="executes" lx={261} ly={367} />

      <Node x={50} y={447} w={470} h={68} title="Credential broker" lines={["phantom credentials · upstream secrets"]} kind="trusted" />

      <Node x={590} y={205} w={160} h={92} title="Policy expansion" lines={["bounded grants"]} />
      <Node x={590} y={435} w={160} h={92} title="Destinations" lines={["APIs · tools ·", "model inference"]} />

      <Edge kind="ctrl" d="M118 82 L118 153" />
      <Edge kind="ctrl" d="M352 82 L352 153" />
      <Edge kind="evid" d="M500 155 L500 84" />
      <Edge kind="ctrl" d="M588 251 L542 251" />
      <Edge d="M520 481 L588 481" />
    </Svg>
  );
}
