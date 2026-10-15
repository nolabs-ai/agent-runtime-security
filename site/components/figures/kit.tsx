import type { ReactNode } from "react";

export type Kind = "box" | "trusted" | "untrusted" | "evidence" | "zone" | "zone-trusted";

export function Svg({ w, h, label, children }: { w: number; h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`-6 -6 ${w + 12} ${h + 12}`} role="img" aria-label={label} className="dg" style={{ minWidth: Math.min(w, 760) }}>
      <defs>
        <marker id="ar-flow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="mk mk-flow" />
        </marker>
        <marker id="ar-evid" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="mk mk-evid" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Zone({
  x, y, w, h, label, kind = "zone", labelAnchor = "start",
}: { x: number; y: number; w: number; h: number; label?: string; kind?: Kind; labelAnchor?: "start" | "end" }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} className={`n n-${kind}`} />
      {label && (
        <text x={labelAnchor === "start" ? x + 16 : x + w - 16} y={y + 22} textAnchor={labelAnchor} className="d-label">
          {label}
        </text>
      )}
    </g>
  );
}

export function Node({
  x, y, w, h, title, lines = [], kind = "box", id,
}: { x: number; y: number; w: number; h: number; title: string; lines?: string[]; kind?: Kind; id?: string }) {
  return (
    <g data-node={id}>
      <rect x={x} y={y} width={w} height={h} rx={10} className={`n n-${kind}`} />
      <text x={x + 14} y={y + 26} className="d-title">{title}</text>
      {lines.map((l, i) => (
        <text key={i} x={x + 14} y={y + 48 + i * 18} className="d-sub">{l}</text>
      ))}
    </g>
  );
}

export function Edge({
  d, kind = "flow", label, lx, ly, anchor = "middle",
}: { d: string; kind?: "flow" | "ctrl" | "evid"; label?: string; lx?: number; ly?: number; anchor?: "start" | "middle" | "end" }) {
  const marker = kind === "evid" ? "url(#ar-evid)" : "url(#ar-flow)";
  return (
    <g className={`edge edge-${kind}`}>
      <path d={d} className={`e e-${kind}`} markerEnd={marker} />
      {label && (
        <text x={lx} y={ly} textAnchor={anchor} className="d-edge">
          {label.split("|").map((line, i) => (
            <tspan key={i} x={lx} dy={i === 0 ? 0 : 13}>{line}</tspan>
          ))}
        </text>
      )}
    </g>
  );
}

export function Lbl({ x, y, text, anchor = "middle" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }) {
  return <text x={x} y={y} textAnchor={anchor} className="d-edge">{text}</text>;
}
