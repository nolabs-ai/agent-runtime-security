import { Edge, Node, Svg, Zone } from "./kit";

const ROWS = [90, 180, 270, 360, 450];
const ATTEMPTS = ["Write or delete files", "Run code or tools", "Use credentials", "Send data out", "Request more authority"];
const CONTROLS: [string, string][] = [
  ["Capability contexts", "per-invocation scope"],
  ["Constrained execution", "no ambient authority"],
  ["Credential broker", "no raw secrets"],
  ["Release checks", "labels and destinations"],
  ["Approval ceiling", "bounded grants"],
];

export function BlastRadius() {
  return (
    <Svg w={1000} h={520} label="Blast radius of a prompt injection: untrusted content enters the agent context and steers the agent to attempt file changes, code and tool execution, credential use, data egress and requests for more authority. Each attempt meets a control enforced outside the agent runtime: capability contexts, constrained execution, the credential broker, release checks and an approval ceiling. The outcome is bounded by the agent's remaining authority; the injection itself is not detected or blocked.">
      <Node x={20} y={100} w={200} h={96} title="Untrusted content" lines={["web page, email,", "message, repository file"]} kind="untrusted" />
      <Node x={20} y={260} w={200} h={96} title="Agent context" lines={["the injection steers", "the agent to act"]} kind="untrusted" />
      <Edge d="M120 196 L120 258" label="1 · read" lx={132} ly={232} anchor="start" />

      <text x={300} y={44} className="d-label">2 · ATTEMPTED ACTIONS</text>
      {ATTEMPTS.map((t, i) => (
        <Node key={t} x={300} y={ROWS[i] - 30} w={200} h={60} title={t} kind="untrusted" />
      ))}
      {ROWS.map((y) => (
        <Edge key={`b${y}`} d={`M220 308 L262 308 L262 ${y} L298 ${y}`} />
      ))}

      <Zone x={540} y={20} w={250} h={490} kind="zone-trusted" label="3 · ENFORCED OUTSIDE THE AGENT" />
      {CONTROLS.map(([t, sub], i) => (
        <Node key={t} x={560} y={ROWS[i] - 30} w={210} h={60} title={t} lines={[sub]} kind="trusted" />
      ))}
      {ROWS.map((y) => (
        <Edge key={`c${y}`} d={`M500 ${y} L558 ${y}`} />
      ))}

      <text x={830} y={44} className="d-label">4 · OUTCOME</text>
      <Node x={830} y={60} w={146} h={420} title="Blast radius" lines={["only what the", "agent's remaining", "authority allows.", "", "The injection itself", "is not detected", "or blocked."]} />
      {ROWS.map((y) => (
        <Edge key={`d${y}`} d={`M770 ${y} L828 ${y}`} />
      ))}
    </Svg>
  );
}
