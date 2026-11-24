# Agent Runtime Security: A Reference Architecture

A reference architecture for constraining the actions AI agents take, managing changes to
their authority during execution, and preserving attributable evidence.

**Status:** review draft 0.3. It has not yet had independent technical review. See
[CONTRIBUTING.md](CONTRIBUTING.md) if you would like to review it.

- **Read the paper:** [`paper/paper.md`](paper/paper.md) (figures render on GitHub)
- **Illustrated site:** the same paper with interactive figures, built from [`site/`](site/)
- **Changes between drafts:** [CHANGELOG.md](CHANGELOG.md)

## Scope

The architecture covers four concerns, and all four must be satisfied together:

1. **Isolation:** agents, tools and generated code run inside boundaries, with enforcement outside the agent runtime.
2. **Authorization:** scoped capabilities, brokered credentials, and explicit runtime grant changes.
3. **Information-flow control:** data labels and taint tracking that follow information between components.
4. **Evidence integrity:** attributable records written and retained beyond the agent's reach.

It specifies an architectural model. Empirical validation and performance evaluation are
future work.

## Citing

Use GitHub's **Cite this repository** button (generated from [`CITATION.cff`](CITATION.cff)),
or copy the BibTeX from the site's front page. Both list the current authors.

## Authors

See [AUTHORS.md](AUTHORS.md) for authors and contributors.

## License

[CC BY 4.0](LICENSE). You may share and adapt this work, including commercially, with
attribution. This covers the paper, the figures and the site source.

## Disclosure

The author is affiliated with nolabs. The architecture specifies vendor-neutral security
contracts. Draft preparation and research were assisted by OpenAI Codex.
