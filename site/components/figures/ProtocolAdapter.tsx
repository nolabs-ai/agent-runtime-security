import { Edge, Node, Svg, Zone } from "./kit";

export function ProtocolAdapter() {
  return (
    <Svg w={1000} h={500} label="Protocol-aware brokering for a database: the agent's client connects to a local adapter endpoint with a phantom password, the broker's protocol adapter terminates the wire protocol and checks each statement against policy, an upstream session authenticates to the database with the real credential, results are relayed to the agent with labels, and the broker records the activity as evidence.">
      <Node x={410} y={20} w={270} h={90} title="Credential backends" lines={["vault, token service,", "KMS, HSM, keychain"]} />

      <Zone x={20} y={150} w={290} h={330} label="AGENT RUNTIME · UNTRUSTED" />
      <Node x={40} y={190} w={250} h={114} title="Client or driver" lines={["psql, a driver or an SDK;", "connects to a local endpoint", "with a phantom password"]} kind="untrusted" />
      <Node x={40} y={346} w={250} h={96} title="Result" lines={["rows returned, labeled;", "no credential in the session"]} kind="untrusted" />

      <Zone x={410} y={150} w={270} h={330} kind="zone-trusted" label="OUTSIDE THE AGENT RUNTIME" />
      <Node x={430} y={190} w={230} h={114} title="Protocol adapter" lines={["terminates the wire protocol,", "verifies context, checks each", "statement against policy"]} kind="trusted" />
      <Node x={430} y={346} w={230} h={114} title="Upstream session" lines={["opens the connection with", "the real credential and", "relays results"]} kind="trusted" />

      <Node x={730} y={190} w={250} h={96} title="Protected evidence" lines={["statements and denials"]} kind="evidence" />
      <Node x={730} y={346} w={250} h={114} title="Database or service" lines={["database, SSH host or", "cloud API; sees only an", "authenticated broker session"]} />

      <Edge kind="ctrl" d="M640 110 L640 188" label="1 · fetch credential" lx={652} ly={142} anchor="start" />
      <Edge d="M290 247 L428 247" label="2 · connect" lx={359} ly={239} />
      <Edge d="M545 304 L545 344" label="3 · allowed" lx={557} ly={330} anchor="start" />
      <Edge d="M660 403 L728 403" label="4 · query" lx={694} ly={395} />
      <Edge d="M428 403 L292 403" label="5 · result" lx={360} ly={395} />
      <Edge kind="evid" d="M660 225 L728 225" label="6 · log" lx={694} ly={217} />
    </Svg>
  );
}
