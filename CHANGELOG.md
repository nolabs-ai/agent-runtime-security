# Changelog

Notable changes to the paper. Versions are review drafts; the date is the date on the draft.
Editorial fixes (typos, wording) are not listed individually.

## [Unreleased]

### Added

- Threat model chapter. Prompt injection is treated as an assumed failure, and runtime governance bounds the blast radius.
- Sections on HTTP credential brokering, protocol adapters, brokered tool execution, grant contraction, and data labeling.
- Figures: single token stream, blast radius, credential brokering, protocol adapters, tool brokering, label propagation.
- `CITATION.cff`, `AUTHORS.md`, contribution guide, and issue templates for technical review and errata.

### Changed

- Renamed from *Agent Runtime Governance* to *Agent Runtime Security*.
- "Enterprise" replaced with "organization" throughout.
- Components renamed: *Supervisor* is now *Policy enforcement*; *Agent-adjacent micro-proxy* is now *Credential broker*.
- Abstract simplified.
- Trust model: agent behavior is treated as untrusted regardless of cause, because probabilistic model outputs can lead to unintended actions without an adversary.
- Repository restructured. The paper source moved to `paper/paper.md`, and the whole repository is licensed under CC BY 4.0.

### Removed

- Standalone Mermaid files and the overview SVG. Figure sources now live inline in `paper/paper.md`.

## [0.3] - 2026-10-14

- Review draft 0.3. First version published in this repository.
