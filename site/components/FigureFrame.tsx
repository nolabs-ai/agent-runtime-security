"use client";

import { useState, type ReactNode } from "react";

type Focus = "all" | "flow" | "ctrl" | "evid";

const LEGEND: { id: Focus; label: string; cls: string }[] = [
  { id: "flow", label: "Operation", cls: "lg-flow" },
  { id: "ctrl", label: "Control / provisioning", cls: "lg-ctrl" },
  { id: "evid", label: "Evidence", cls: "lg-evid" },
];

export function FigureFrame({
  n,
  title,
  children,
  caption,
  legend = true,
  paper = false,
  actions,
}: {
  n: number;
  title?: string;
  children: ReactNode;
  caption: ReactNode;
  legend?: boolean;
  paper?: boolean;
  actions?: ReactNode;
}) {
  const [focus, setFocus] = useState<Focus>("all");
  return (
    <figure className="figure" id={`figure-${n}`}>
      <div className="figure-head">
        <span className="figure-n">Figure {n}</span>
        {title && <span className="figure-title">{title}</span>}
        {legend && (
          <div className="legend" role="group" aria-label="Highlight flow type">
            {LEGEND.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`chip ${l.cls}`}
                aria-pressed={focus === l.id}
                onClick={() => setFocus(focus === l.id ? "all" : l.id)}
              >
                <i />
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={`figure-stage ${paper ? "figure-paper" : ""}`} data-focus={focus}>
        <div className="figure-scroll">{children}</div>
      </div>
      <figcaption>
        {caption}
        {actions}
      </figcaption>
    </figure>
  );
}
