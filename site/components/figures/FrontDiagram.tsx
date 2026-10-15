import { Edge, Node, Svg, Zone } from "./kit";

export function FrontDiagram() {
  return (
    <Svg w={760} h={430} label="High-level architecture: enterprise governance sets policy for a trusted runtime; untrusted agents, tools and generated code act only through it; it reaches approved destinations and writes protected evidence.">
      <Node x={10} y={10} w={250} h={72} title="Enterprise governance" lines={["policy, identity, credentials"]} />
      <Node x={300} y={10} w={250} h={72} title="Evidence retention" lines={["signed, held outside agents"]} kind="evidence" />

      <Zone x={10} y={125} w={550} h={295} />
      <text x={26} y={408} className="d-label">GOVERNED EXECUTION DOMAIN</text>
      <Node x={30} y={150} w={510} h={92} title="Trusted runtime" lines={["enforces policy · brokers credentials · records evidence"]} kind="trusted" />

      <Node x={30} y={315} w={155} h={74} title="Agents" lines={["untrusted"]} kind="untrusted" />
      <Node x={205} y={315} w={155} h={74} title="Tools" lines={["own capabilities"]} kind="untrusted" />
      <Node x={380} y={315} w={160} h={74} title="Generated code" lines={["no ambient authority"]} kind="untrusted" />

      <Node x={590} y={150} w={160} h={92} title="Destinations" lines={["approved only,", "no direct path"]} />

      <Edge kind="ctrl" d="M135 82 L135 148" />
      <Edge kind="evid" d="M425 150 L425 84" />
      <Edge d="M107 315 L107 244" />
      <Edge d="M282 315 L282 244" />
      <Edge d="M460 315 L460 244" />
      <Edge d="M540 196 L588 196" />
      <text x={290} y={284} textAnchor="middle" className="d-edge">every action is mediated</text>
    </Svg>
  );
}
