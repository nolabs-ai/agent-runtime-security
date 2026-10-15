import { ImageResponse } from "next/og";

export const alt = "Agent Runtime Governance: A Reference Architecture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg,#0b1220 0%,#10223a 60%,#0d3b3a 100%)",
          color: "#eaf0f8",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#2dd4bf" }}>
          TECHNICAL PAPER · REVIEW DRAFT 0.3
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Agent Runtime Governance</div>
          <div style={{ fontSize: 40, marginTop: 20, color: "#9fb0c8" }}>A Reference Architecture</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9fb0c8" }}>Luke Hinds · nolabs</div>
      </div>
    ),
    size,
  );
}
