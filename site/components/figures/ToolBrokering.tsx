import { Edge, Node, Svg, Zone } from "./kit";

export function ToolBrokering() {
  return (
    <Svg w={1000} h={500} label="Tool-specific brokering: the agent requests a tool invocation, the broker verifies the grant and fetches the credential, the runtime control system launches a sandbox containing only the named CLI and provisions the credential into it, the CLI calls its one upstream destination, and output is relayed to the agent without the credential. The sandbox and credential are destroyed on exit.">
      <Node x={350} y={20} w={230} h={90} title="Credential backends" lines={["vault, token service,", "KMS, HSM, keychain"]} />

      <Zone x={20} y={150} w={240} h={330} label="AGENT RUNTIME · UNTRUSTED" />
      <Node x={40} y={190} w={200} h={270} title="Agent" lines={["requests a tool invocation", "and receives its output.", "", "Never holds the credential."]} kind="untrusted" />

      <Zone x={330} y={150} w={270} h={330} kind="zone-trusted" label="OUTSIDE THE AGENT RUNTIME" />
      <Node x={350} y={190} w={230} h={96} title="Verify and provision" lines={["check grant, tool and", "destination; fetch credential"]} kind="trusted" />
      <Node x={350} y={346} w={230} h={114} title="Launch and relay" lines={["start sandbox, inject", "credential, relay output,", "destroy on exit"]} kind="trusted" />

      <Zone x={670} y={150} w={310} h={180} label="SANDBOX · ONE CLI" />
      <Node x={690} y={190} w={270} h={114} title="Tool CLI" lines={["only this CLI holds the", "credential; egress limited", "to its one destination"]} />
      <Node x={690} y={380} w={270} h={90} title="Upstream service" lines={["sees the CLI's request"]} />

      <Edge kind="ctrl" d="M555 110 L555 188" label="1 · fetch" lx={567} ly={146} anchor="start" />
      <Edge d="M240 238 L348 238" label="2 · invoke" lx={294} ly={230} />
      <Edge d="M465 286 L465 344" label="3 · provision" lx={477} ly={322} anchor="start" />
      <Edge kind="ctrl" d="M580 380 L640 380 L640 247 L688 247" label="4 · launch" lx={652} ly={352} anchor="start" />
      <Edge d="M825 304 L825 378" label="5 · call" lx={837} ly={346} anchor="start" />
      <Edge d="M348 403 L242 403" label="6 · output" lx={295} ly={395} />
    </Svg>
  );
}
