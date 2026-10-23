import { Edge, Node, Svg, Zone } from "./kit";

export function CredentialBroker() {
  return (
    <Svg w={1000} h={500} label="Credential broker flow: the broker fetches the upstream credential from a storage backend, issues a short-lived phantom token into the agent's ambient environment, the agent places the phantom token in an Authorization Bearer header or the URI, and on exit the broker verifies context, grant and operation, swaps the phantom for the real token, and forwards the request to the upstream service, recording evidence.">
      <Node x={410} y={20} w={270} h={90} title="Credential backends" lines={["vault, token service,", "KMS, HSM, keychain"]} />

      <Zone x={20} y={150} w={290} h={330} label="AGENT RUNTIME · UNTRUSTED" />
      <Node x={40} y={190} w={250} h={90} title="Ambient environment" lines={["phantom token present as", "an ordinary credential"]} kind="untrusted" />
      <Node x={40} y={346} w={250} h={114} title="Agent or tool" lines={["selects the token and places", "it in an Authorization:", "Bearer header or the URI"]} kind="untrusted" />

      <Zone x={410} y={150} w={270} h={330} kind="zone-trusted" label="OUTSIDE THE AGENT RUNTIME" />
      <Node x={430} y={190} w={230} h={90} title="Issue phantom" lines={["short-lived, bound to", "session and destination"]} kind="trusted" />
      <Node x={430} y={346} w={230} h={114} title="Mediate and swap" lines={["verify context, grant and", "operation; replace phantom", "with the real token"]} kind="trusted" />

      <Node x={730} y={190} w={250} h={90} title="Protected evidence" lines={["issuance, swaps and denials"]} kind="evidence" />
      <Node x={730} y={346} w={250} h={114} title="Upstream service" lines={["API, tool or model provider", "sees only the real token"]} />

      <Edge kind="ctrl" d="M640 110 L640 188" label="1 · fetch upstream credential" lx={652} ly={142} anchor="start" />
      <Edge kind="ctrl" d="M430 235 L292 235" label="2 · inject" lx={361} ly={227} />
      <Edge d="M165 280 L165 344" label="3 · selects" lx={177} ly={318} anchor="start" />
      <Edge d="M290 403 L428 403" label="4 · request" lx={359} ly={395} />
      <Edge d="M660 403 L728 403" label="5 · swap" lx={694} ly={395} />
      <Edge kind="evid" d="M660 365 L695 365 L695 235 L728 235" label="6 · record" lx={705} ly={312} anchor="start" />
    </Svg>
  );
}
