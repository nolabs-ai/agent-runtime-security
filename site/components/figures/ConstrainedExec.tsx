import { Edge, Node, Svg } from "./kit";

export function ConstrainedExec() {
  return (
    <Svg w={1000} h={450} label="Generated-code execution flow: agent request, runtime control system, constrained execution environment, trusted output boundary, destination, with protected evidence.">
      <Node x={20} y={70} w={140} h={120} title="Agent request" lines={["code and input", "references"]} kind="untrusted" />
      <Node x={240} y={70} w={160} h={120} title="Control system" lines={["validate policy,", "provision context"]} kind="trusted" />
      <Node x={480} y={70} w={220} h={120} title="Constrained environment" lines={["isolated inputs, scratch", "no ambient credentials", "or network; limits"]} kind="untrusted" />
      <Node x={780} y={70} w={200} h={120} title="Output boundary" lines={["validate artifacts,", "retain labels"]} kind="trusted" />
      <Node x={780} y={330} w={200} h={90} title="Destination" lines={["agent context, workspace", "or approved destination"]} />
      <Node x={240} y={330} w={320} h={90} title="Protected evidence" lines={["execution identity, artifact digests,", "policy, lifecycle and outcome"]} kind="evidence" />

      <Edge d="M160 130 L238 130" label="request" lx={199} ly={122} />
      <Edge d="M400 130 L478 130" label="launch" lx={439} ly={122} />
      <Edge d="M700 130 L778 130" label="results" lx={739} ly={122} />
      <Edge d="M880 190 L880 328" label="authorized import or release" lx={872} ly={250} anchor="end" />
      <Edge d="M340 70 L340 40 L590 40 L590 68" label="terminate children and clean up" lx={465} ly={32} />
      <Edge kind="evid" d="M320 190 L320 328" label="identity, digests, policy" lx={330} ly={250} anchor="start" />
      <Edge kind="evid" d="M800 190 L800 290 L500 290 L500 328" />
    </Svg>
  );
}
