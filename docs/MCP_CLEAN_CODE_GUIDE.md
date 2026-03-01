# MCP Clean Code Integration Guide

This guide explains how to activate and use the locally installed MCP servers that support DigiSafe’s clean-code practices. Each section includes a quick-start checklist you can follow whenever you work on the project.

---

## Sequential Thinking MCP

**Purpose**: Structured reasoning aid for complex code changes and architecture decisions.

### Checklist
- [ ] Start the Sequential Thinking MCP (`npx -y @modelcontextprotocol/server-sequential-thinking`) in your editor/CLI.
- [ ] Frame the problem in the first thought: goal, constraints, affected modules.
- [ ] Iterate through thoughts; capture trade-offs, unknowns, and proof points.
- [ ] Mark thoughts as revisions when updating earlier conclusions.
- [ ] Attach the final reasoning transcript to your PR description or task notes.

### Best Practices
- Trigger the MCP before major refactors, multi-touch features, or incident postmortems.
- Use branching thoughts for alternative implementations.
- After implementation, rerun a final thought to validate parity with requirements.

---

## Serena MCP

**Purpose**: Language-aware project assistant powered by VScode/Serena LSP to keep TypeScript code tidy and aligned with project standards.

### Checklist
- [ ] Ensure `.serena/project.yml` exists and language server is indexed (`serena project index`).
- [ ] Launch the MCP server for DigiSafe: `serena start-mcp-server --project /Users/herrnyembo/digi_safe --context ide-assistant`.
- [ ] Use Serena tools (`think_about_task_adherence`, `summarize_changes`, etc.) during implementation to confirm scope compliance.
- [ ] Run `npm run lint` and `npm run typecheck` locally before submitting changes.
- [ ] Capture notable Serena findings in review notes or PR feedback.

### Best Practices
- Let Serena’s search and symbol tools surface ripple effects before editing shared modules.
- Keep the project index fresh (`serena project index`) after large file additions or renames.
- Use Serena’s “prepare for new conversation” tool before handoffs to share active context.

---

## Context7 MCP

**Purpose**: Instant, up-to-date external documentation for libraries/frameworks to reduce outdated or incorrect API usage.

### Checklist
- [ ] Configure `context7` MCP (`npx -y @upstash/context7-mcp`) or use the VS Code extension.
- [ ] Resolve the target library via `resolve-library-id` before requesting docs.
- [ ] Request specific versions/examples when integrating new APIs.
- [ ] Save relevant snippets or citations into `docs/notes/<feature>.md` for future reference.
- [ ] Note Context7-backed decisions in code comments when adopting novel patterns.

### Best Practices
- Combine Context7 outputs with Sequential Thinking to evaluate new dependencies or major upgrades.
- Re-check documentation when updating package versions to catch breaking changes early.
- Prefer Context7-backed snippets in Storybook stories and unit tests to ensure accuracy.

---

## Pull Request Template Snippet

Include the following block in PR descriptions:

```
## MCP Review
- [ ] Sequential Thinking transcript attached / linked
- [ ] Serena lint & typecheck run locally
- [ ] Context7 consulted for new or upgraded APIs (n/a if untouched)
```

Following these checklists keeps MCP workflows visible and enforces clean-code standards across the team.
