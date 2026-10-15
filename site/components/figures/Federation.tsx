import { Edge, Node, Svg, Zone } from "./kit";

export function Federation() {
  return (
    <Svg w={1040} h={420} label="Federation across three enterprises: bounded delegation from A to B, onward grant from B to C only if the original grant and B's policy permit, with signed receipts flowing back.">
      <Zone x={20} y={50} w={250} h={340} label="ENTERPRISE A" />
      <Zone x={420} y={50} w={230} h={340} label="ENTERPRISE B" />
      <Zone x={800} y={50} w={220} h={340} label="ENTERPRISE C" />

      <Node x={40} y={90} w={210} h={80} title="Local policy" lines={["and trust"]} kind="trusted" />
      <Node x={40} y={235} w={210} h={110} title="Agent A runtime" lines={["own identity and policy"]} kind="untrusted" />
      <Node x={440} y={90} w={190} h={80} title="Federation checks" lines={["and local authorization"]} kind="trusted" />
      <Node x={440} y={235} w={190} h={110} title="Agent B runtime" lines={["own identity and policy"]} kind="untrusted" />
      <Node x={820} y={90} w={180} h={80} title="Federation checks" lines={["and local authorization"]} kind="trusted" />
      <Node x={820} y={235} w={180} h={110} title="Agent C runtime" lines={["own identity and policy"]} kind="untrusted" />

      <Edge d="M145 170 L145 233" />
      <Edge d="M535 170 L535 233" />
      <Edge d="M910 170 L910 233" />

      <Edge d="M250 265 L292 265 L292 130 L438 130" label="bounded|delegation" lx={300} ly={190} anchor="start" />
      <Edge d="M630 265 L672 265 L672 130 L818 130" label="onward grant,|if original grant|and B policy|permit" lx={680} ly={176} anchor="start" />

      <Edge kind="evid" d="M438 325 L252 325" label="signed receipt and|evidence commitment" lx={345} ly={298} />
      <Edge kind="evid" d="M818 325 L632 325" label="signed receipt and|evidence commitment" lx={725} ly={298} />
    </Svg>
  );
}
