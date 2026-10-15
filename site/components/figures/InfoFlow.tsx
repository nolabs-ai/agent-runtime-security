import { Edge, Node, Svg } from "./kit";

export function InfoFlow() {
  return (
    <Svg w={1000} h={480} label="Information flow: labeled data enters a model context, derived output inherits restrictions, and a destination policy decides to release, require content-bound approval, or block.">
      <Node x={10} y={210} w={130} h={100} title="Labeled data" lines={["trusted source", "provenance"]} kind="evidence" />
      <Node x={165} y={210} w={140} h={100} title="Model context" lines={["accumulated", "restrictions"]} kind="untrusted" />
      <Node x={330} y={210} w={140} h={100} title="Derived output" lines={["inherits", "restrictions"]} kind="untrusted" />

      <g>
        <path d="M535 260 L630 190 L725 260 L630 330 Z" className="n n-trusted" />
        <text x={630} y={256} textAnchor="middle" className="d-title" style={{ fontSize: 13 }}>Destination and</text>
        <text x={630} y={274} textAnchor="middle" className="d-title" style={{ fontSize: 13 }}>info-flow policy</text>
      </g>

      <Node x={790} y={20} w={200} h={60} title="Release exact content" kind="evidence" />
      <Node x={790} y={105} w={200} h={65} title="Verify approved bytes" lines={["and release conditions"]} kind="trusted" />
      <Node x={790} y={215} w={200} h={90} title="Authorized reviewer" lines={["content digest, destination,", "operation and expiry"]} kind="trusted" />
      <Node x={790} y={400} w={200} h={60} title="Block disclosure" kind="untrusted" />

      <Edge d="M140 260 L163 260" />
      <Edge d="M305 260 L328 260" />
      <Edge d="M470 260 L533 260" />
      <Edge kind="evid" d="M630 190 L630 50 L788 50" label="permitted" lx={700} ly={42} />
      <Edge d="M725 260 L788 260" label="eligible" lx={757} ly={251} />
      <Edge d="M890 215 L890 172" />
      <Edge kind="evid" d="M890 105 L890 82" />
      <Edge d="M630 330 L630 430 L788 430" label="denied" lx={700} ly={422} />
    </Svg>
  );
}
