"use client";

import { useEffect, useState } from "react";
import { Svg } from "./kit";

const P = [
  { id: "A", x: 110, name: "Agent or tool" },
  { id: "R", x: 300, name: "Trusted runtime" },
  { id: "G", x: 490, name: "Governance authority" },
  { id: "E", x: 680, name: "Protected evidence" },
  { id: "X", x: 880, name: "Resource" },
] as const;
const px = (id: string) => P.find((p) => p.id === id)!.x;

type Msg = { from: string; to: string; y: number; text: string; dashed?: boolean };

const MSGS: Msg[] = [
  { from: "A", to: "R", y: 110, text: "Request operation" },
  { from: "R", to: "R", y: 150, text: "Validate identity, policy, lease and data restrictions" },
  { from: "R", to: "G", y: 232, text: "Exact scoped expansion request" },
  { from: "G", to: "G", y: 270, text: "Authenticate approver and check grant authority" },
  { from: "G", to: "R", y: 315, text: "Bound approval or denial", dashed: true },
  { from: "R", to: "R", y: 353, text: "Verify scope, freshness and revocation state" },
  { from: "R", to: "E", y: 442, text: "Durably record authorization and intent" },
  { from: "E", to: "R", y: 477, text: "Durable acknowledgement", dashed: true },
  { from: "R", to: "X", y: 512, text: "Perform constrained operation" },
  { from: "X", to: "R", y: 547, text: "Observed result", dashed: true },
  { from: "R", to: "E", y: 582, text: "Append outcome or unresolved state" },
  { from: "R", to: "A", y: 664, text: "Block operation", dashed: true },
];

const NOTES = [
  "The agent asks. A request is not an authorization.",
  "The runtime checks identity, policy, lease and data restrictions before anything else.",
  "If an additional grant could be approved, the runtime sends an exact, scoped request to the governance authority.",
  "The authority authenticates the approver and checks that they hold the authority to grant this.",
  "A bound approval, or a denial, returns to the runtime.",
  "The runtime verifies scope, freshness and revocation state before activating anything.",
  "Intent is durably recorded before the operation happens.",
  "The operation proceeds only after durable acknowledgement.",
  "The constrained operation runs against the resource.",
  "The runtime observes the result.",
  "The outcome (or an unresolved state) is appended to the evidence record.",
  "In the other branch, a denial or an unavailable mandatory control blocks the operation.",
];

export function GrantSequence() {
  const [step, setStep] = useState(MSGS.length - 1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setStep((s) => {
        if (s >= MSGS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1300);
    return () => clearInterval(t);
  }, [playing]);

  const state = (i: number) => (i === step ? "is-current" : i < step ? "is-done" : "is-future");

  return (
    <div>
      <Svg w={1000} h={690} label="Sequence diagram of runtime grant expansion between agent, trusted runtime, governance authority, protected evidence and resource.">
        {/* lifelines */}
        {P.map((p) => (
          <g key={p.id}>
            <line x1={p.x} y1={62} x2={p.x} y2={675} className="lifeline" />
            <rect x={p.x - 78} y={16} width={156} height={44} rx={10} className={`n ${p.id === "R" ? "n-trusted" : p.id === "E" ? "n-evidence" : p.id === "A" ? "n-untrusted" : "n-box"}`} />
            <text x={p.x} y={43} textAnchor="middle" className="d-title" style={{ fontSize: 13 }}>{p.name}</text>
          </g>
        ))}

        {/* alt frames */}
        <g>
          <rect x={30} y={185} width={940} height={195} rx={8} className="alt" />
          <text x={42} y={203} className="d-label">ALT · ADDITIONAL GRANT IS ELIGIBLE FOR APPROVAL</text>
          <rect x={30} y={396} width={940} height={202} rx={8} className="alt" />
          <text x={42} y={414} className="d-label">ALT · ALL REQUIREMENTS PERMIT THE OPERATION</text>
          <line x1={30} x2={970} y1={610} y2={610} className="alt-sep" />
          <text x={42} y={628} className="d-label">ELSE · DENIED OR MANDATORY CONTROL UNAVAILABLE</text>
        </g>

        {MSGS.map((m, i) => {
          const x1 = px(m.from);
          const x2 = px(m.to);
          const self = m.from === m.to;
          const dir = x2 > x1 ? 1 : -1;
          const cls = `msg ${state(i)} ${i >= 6 && i <= 10 ? "msg-evid" : ""}`;
          return (
            <g key={i} className={cls} onClick={() => { setPlaying(false); setStep(i); }}>
              {self ? (
                <>
                  <path d={`M${x1} ${m.y} L${x1 + 42} ${m.y} L${x1 + 42} ${m.y + 20} L${x1 + 2} ${m.y + 20}`} className={`e e-flow`} markerEnd="url(#ar-flow)" />
                  <text x={x1 + 52} y={m.y + 14} className="d-msg">{m.text}</text>
                </>
              ) : (
                <>
                  <path d={`M${x1 + dir * 2} ${m.y} L${x2 - dir * 2} ${m.y}`} className={`e ${m.dashed ? "e-ctrl" : "e-flow"}`} markerEnd={i >= 6 && i <= 10 && m.to === "E" ? "url(#ar-evid)" : "url(#ar-flow)"} />
                  <text x={(x1 + x2) / 2} y={m.y - 7} textAnchor="middle" className="d-msg">{m.text}</text>
                </>
              )}
              <circle cx={self ? x1 - 14 : x1 - dir * 18} cy={m.y} r={0} />
            </g>
          );
        })}
      </Svg>

      <div className="stepper">
        <div className="stepper-btns">
          <button type="button" onClick={() => { setStep(0); setPlaying(true); }} className="btn btn-sm">
            ▶ Play through
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} aria-label="Previous step">←</button>
          <span className="stepper-count">{step + 1} / {MSGS.length}</span>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => { setPlaying(false); setStep((s) => Math.min(MSGS.length - 1, s + 1)); }} aria-label="Next step">→</button>
        </div>
        <p className="stepper-note" aria-live="polite"><strong>{MSGS[step].text}.</strong> {NOTES[step]}</p>
      </div>
    </div>
  );
}
