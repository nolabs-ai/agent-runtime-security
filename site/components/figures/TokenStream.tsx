import { Edge, Node, Svg } from "./kit";

export function TokenStream() {
  return (
    <Svg w={1000} h={420} label="Single token stream: the system prompt, user request, retrieved content, tool outputs and messages from other agents are concatenated into one context. Nothing in the context marks which tokens are instructions and which are data, so the model decides the next action from all of it.">
      <Node x={20} y={30} w={250} h={62} title="System prompt" lines={["operator instructions"]} kind="trusted" />
      <Node x={20} y={100} w={250} h={62} title="User request" lines={["task and intent"]} />
      <Node x={20} y={170} w={250} h={62} title="Retrieved content" lines={["web, documents, email, code"]} kind="untrusted" />
      <Node x={20} y={240} w={250} h={62} title="Tool outputs" lines={["results and errors"]} kind="untrusted" />
      <Node x={20} y={310} w={250} h={62} title="Other agents" lines={["messages"]} kind="untrusted" />

      <Node x={380} y={30} w={260} h={342} title="One token stream" lines={["instructions and data are", "concatenated into a single", "context.", "", "Nothing in it marks which", "tokens are instructions and", "which are data."]} kind="untrusted" />
      <Node x={740} y={146} w={240} h={110} title="Next action" lines={["tool call, code, message", "or credential use"]} kind="untrusted" />

      <Edge d="M270 61 L378 61" />
      <Edge d="M270 131 L378 131" />
      <Edge d="M270 201 L378 201" />
      <Edge d="M270 271 L378 271" />
      <Edge d="M270 341 L378 341" />
      <Edge d="M640 201 L738 201" label="model decides" lx={689} ly={193} />
      <text x={20} y={404} className="d-label">A PARAMETERIZED QUERY SEPARATES CODE FROM DATA. A LANGUAGE MODEL HAS NO EQUIVALENT BOUNDARY.</text>
    </Svg>
  );
}
