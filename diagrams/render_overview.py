"""Generate the editable overview SVG using only Python's standard library."""

from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent
parts = ['''<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1220" viewBox="0 0 1800 1220" role="img" aria-labelledby="title desc">
<title id="title">Agent Runtime Governance: A Reference Architecture</title>
<desc id="desc">Governance services establish policy, identity, credential custody and evidence retention. Inside a governed execution domain, a runtime control system outside the agent runtime governs separate agent and tool sandboxes. An adjacent credential broker mediates external access. Arrows distinguish control, operation and evidence flows.</desc>
<defs>
<marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#334155"/></marker>
<marker id="green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#087f72"/></marker>
</defs>
<style>text{font-family:Arial,Helvetica,sans-serif;fill:#172b43}.small{font-size:18px;fill:#475569}.label{font-size:17px;font-weight:700;letter-spacing:1.5px}.heading{font-size:24px;font-weight:700}.body{font-size:20px}.flow{fill:none;stroke:#334155;stroke-width:2;marker-end:url(#arrow)}.control{stroke-dasharray:7 6}.evidence{fill:none;stroke:#087f72;stroke-width:2.5;marker-end:url(#green)}</style>
<rect width="1800" height="1220" fill="#fff"/>
''']


def text(x, y, value, cls="body"):
    parts.append(f'<text x="{x}" y="{y}" class="{cls}">{escape(value)}</text>')


def rect(x, y, w, h, fill, stroke="#cbd5e1", radius=10):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')


def box(x, y, w, h, title, lines, fill="#fff", stroke="#cbd5e1"):
    rect(x, y, w, h, fill, stroke)
    text(x + 22, y + 37, title, "heading")
    for i, line in enumerate(lines):
        text(x + 22, y + 72 + i * 27, line)


def path(d, cls="flow"):
    parts.append(f'<path d="{d}" class="{cls}"/>')


text(48, 52, "REFERENCE ARCHITECTURE / REVIEW DRAFT 0.3", "label")
parts.append('<text x="48" y="108" font-size="44" font-weight="700">Agent Runtime Governance</text>')
text(48, 144, "Least privilege • explicit policy • controlled authority changes • verifiable evidence", "body")
text(48, 192, "GOVERNANCE SERVICES", "label")
box(48, 210, 406, 120, "Policy and identity", ["Trust, enrollment, session binding", "Approvals, leases and revocation"])
box(478, 210, 406, 120, "Credential custody", ["Vault or provider token service", "Scoped provisioning to local brokers"])
box(908, 210, 406, 120, "Artifact admission", ["Tool and model provenance", "Verified claims and policy decisions"])
box(1338, 210, 414, 120, "Evidence retention", ["Independent verification", "Durable records and signed receipts"], "#edf8f5", "#8abdb4")

rect(48, 392, 1266, 640, "#f8fafc", "#64748b", 14)
text(72, 430, "GOVERNED EXECUTION DOMAIN / OUTER ISOLATION BOUNDARY", "label")
text(72, 460, "Separate capability contexts for agents, tools, and generated-code execution", "small")

rect(72, 486, 1218, 240, "#edf4fb", "#53799e")
text(96, 520, "RUNTIME CONTROL SYSTEM / OUTSIDE THE AGENT RUNTIME", "label")
box(96, 542, 370, 152, "Policy enforcement", ["Session and invocation binding", "Filesystem and socket controls", "Grant changes and lease checks"], "#fff", "#91aec9")
box(490, 542, 370, 152, "Credential broker", ["Tool-scoped credential use", "Destination, method and path", "Information-flow release checks"], "#fff", "#91aec9")
box(884, 542, 382, 152, "Protected evidence writer", ["Intent, decisions and outcomes", "Keys inaccessible to agents", "Capture failure blocks activity"], "#edf8f5", "#8abdb4")

box(72, 824, 280, 138, "Agent A sandbox", ["Untrusted agent process", "Explicit capabilities"], "#fff9ef", "#c9aa78")
box(376, 824, 280, 138, "Tool invocation A", ["Separate sandbox", "Narrow credential context"], "#fff9ef", "#c9aa78")
box(680, 824, 280, 138, "Agent B sandbox", ["Independent policy", "No inherited expansion"], "#fff9ef", "#c9aa78")
box(984, 824, 282, 138, "Generated code", ["Isolated inputs and scratch", "No ambient authority", "Bounded execution"], "#fff9ef", "#c9aa78")
text(72, 1003, "Generated outputs remain untrusted; validate and retain data restrictions before import or release.", "small")

box(1360, 486, 392, 172, "Governed destinations", ["External APIs and remote tools", "Approved model inference", "No direct bypass path"])
box(1360, 742, 392, 178, "Information-flow contract", ["Conservative label propagation", "Approval binds exact content,", "destination and operation"])

path("M250 330 V392", "flow control")
text(267, 371, "grants / refresh", "small")
path("M675 330 V392", "flow control")
text(691, 371, "scoped credentials", "small")
path("M1110 330 V392", "flow control")
text(1126, 371, "admission", "small")
path("M1266 676 H1328 V354 H1540 V330", "evidence")
text(1376, 384, "signed evidence", "small")
path("M860 590 H884", "evidence")
path("M466 710 H1075 V694", "evidence")
path("M466 676 V710", "evidence")
path("M860 562 H878 V474 H1344 V568 H1360")
text(1376, 463, "authorized requests", "small")
path("M212 824 V772 H260 V694")
text(83, 754, "operation request", "small")
path("M820 824 V752 H320 V694")
path("M410 694 V800 H516 V824")
text(377, 780, "brokered launch", "small")
path("M516 824 V814 H675 V694")
path("M1125 824 V792 H720 V694")
text(935, 780, "mediated resource access", "small")

path("M48 1090 H108")
text(124, 1096, "Operation", "small")
path("M300 1090 H360", "flow control")
text(376, 1096, "Control / provisioning", "small")
path("M650 1090 H710", "evidence")
text(726, 1096, "Evidence", "small")
text(48, 1142, "Runtime functions may share an implementation; credentials and authority remain isolated by session and invocation.", "small")
text(48, 1176, "Select isolation mechanisms against required separation, permitted crossings, and shared trust dependencies.", "small")
parts.append('</svg>')
(OUT / 'overview.svg').write_text('\n'.join(parts) + '\n')
