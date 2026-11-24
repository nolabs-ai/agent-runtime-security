import { Edge, Lbl, Node, Svg, Zone } from "./kit";

export function Topology() {
  return (
    <Svg w={1000} h={710} label="Runtime governance topology: governance services above a governed execution domain containing a runtime control system and separate agent, tool and generated-code sandboxes.">
      {/* governance services */}
      <Node x={20} y={20} w={225} h={78} title="Governance" lines={["policy, approvals, trust,", "revocation"]} />
      <Node x={265} y={20} w={225} h={78} title="Identity" lines={["enrollment and", "workload federation"]} />
      <Node x={510} y={20} w={225} h={78} title="Credential custody" lines={["vault or provider", "token service"]} />
      <Node x={755} y={20} w={225} h={78} title="Evidence service" lines={["verification and", "protected retention"]} kind="evidence" />

      {/* domain */}
      <Zone x={20} y={190} w={740} h={500} />
      <text x={36} y={678} className="d-label">GOVERNED EXECUTION DOMAIN — OUTER ISOLATION BOUNDARY</text>
      <Zone x={40} y={230} w={700} h={170} kind="zone-trusted" />
      <text x={726} y={381} textAnchor="end" className="d-label">RUNTIME CONTROL SYSTEM</text>
      <text x={726} y={394} textAnchor="end" className="d-label">OUTSIDE THE AGENT RUNTIME</text>
      <Node x={55} y={245} w={280} h={100} title="Policy enforcement" lines={["session binding and", "grant checks"]} kind="trusted" />
      <Node x={355} y={245} w={200} h={100} title="Credential broker" lines={["agent-adjacent,", "invocation-scoped"]} kind="trusted" />
      <Node x={575} y={245} w={150} h={100} title="Evidence writer" lines={["signing keys outside", "agent access"]} kind="evidence" />

      {/* sandboxes */}
      <Node x={40} y={450} w={165} h={100} title="Agent A sandbox" lines={["untrusted agent"]} kind="untrusted" />
      <Node x={225} y={450} w={165} h={100} title="Agent B sandbox" lines={["untrusted agent,", "independent policy"]} kind="untrusted" />
      <Node x={410} y={450} w={165} h={100} title="Tool invocation" lines={["approved tool,", "specific capabilities"]} kind="untrusted" />
      <Node x={595} y={450} w={145} h={100} title="Generated code" lines={["isolated inputs", "resource limits"]} kind="untrusted" />
      <Node x={595} y={590} w={145} h={70} title="Output validation" lines={["keeps data labels"]} kind="trusted" />

      {/* destinations */}
      <Node x={775} y={300} w={205} h={100} title="Approved destinations" lines={["APIs, tools, model", "inference. No direct", "bypass path."]} />

      {/* control / provisioning */}
      <Edge kind="ctrl" d="M132 98 L132 245" />
      <Edge kind="ctrl" d="M377 98 L377 125 L215 125 L215 245" />
      <Edge kind="ctrl" d="M622 98 L622 150 L420 150 L420 245" />

      {/* operations */}
      <Edge d="M100 450 L100 347" />
      <Edge d="M300 450 L300 347" />
      <Edge d="M240 347 L240 425 L492 425 L492 448" />
      <Edge d="M492 425 L667 425 L667 448" />
      <Edge d="M530 450 L530 347" />
      <Edge d="M667 550 L667 588" />
      <Edge d="M595 625 L122 625 L122 552" />
      <Edge d="M520 245 L520 212 L878 212 L878 298" />

      {/* evidence */}
      <Edge kind="evid" d="M650 245 L650 175 L867 175 L867 100" />
      <Edge kind="evid" d="M195 345 L195 365 L650 365 L650 347" />
      <Edge kind="evid" d="M455 345 L455 365" />
      <Edge kind="evid" d="M740 625 L750 625 L750 300 L727 300" />
      <Lbl x={122} y={170} text="scoped grants" anchor="end" />
      <Lbl x={296} y={117} text="session binding" />
      <Lbl x={520} y={142} text="scoped credentials" />
      <Lbl x={108} y={441} text="operation request" anchor="start" />
      <Lbl x={380} y={417} text="validated launch" />
      <Lbl x={640} y={417} text="bounded code execution" />
      <Lbl x={522} y={392} text="bound invocation request" anchor="end" />
      <Lbl x={659} y={575} text="untrusted outputs" anchor="end" />
      <Lbl x={360} y={617} text="authorized import" />
      <Lbl x={810} y={204} text="authorized requests" />
      <Lbl x={760} y={167} text="signed evidence" />
    </Svg>
  );
}
