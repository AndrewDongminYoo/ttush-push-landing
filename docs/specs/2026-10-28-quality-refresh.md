# Quality Tooling Refresh

## Approved Scope

Refresh supported dependencies and existing quality tooling.
Preserve public APIs, generated artifacts and repository-specific boundaries.

## Acceptance

- Pinact remains locked to `4.1.1` with `lint` and `upgrade`.
- The full no-fix Trunk scan and declared project gates pass.
- Changed manifests have package-manager-generated lockfile updates under repository policy.
- Advisory dispositions have specific evidence and affected knowledge claims are reconciled.

## Publication

Push and PR creation require explicit repository-specific approval.
After approval, continue the requested hosted gates, merge, cleanup and memory recording.

## Boundaries and Precedent

Preserve the inherited staged Trunk and Markdownlint maintenance changes; authorship is unknown.
Keep application source, legal text, board frames, media and domain declarations byte-identical.
Use pnpm 10.34.9 and Node 22.23.4 with matching CI and a package-manager-generated lock.
Retain TypeScript 6 within the installed parser peer range.
Run declared lint/build gates in an owned fixture of positively enumerated public indexed inputs and empty runtime configuration.
Verify static localized metadata and existing legal-source presence without asserting full legal correctness or browser layout.
Preserve the existing legal Markdownlint exclusion.
Global gate and hook precedent from `wiki/sources/claude--claude.md`, `raw/sources/.claude/CLAUDE.md` and `wiki/synthesis/no-verify-hook-diagnosis.md` confirmed lock regeneration, pinned actions and actual gate evidence.
The returned source commit was `9670d54de3076c5239713f54900c7a855bd18478`; current freshness remains UNVERIFIED.
No project-specific precedent was returned by that bounded query.

## Offline scanner boundary

Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` to exercise the 15 filesystem JSONL diagnostic reader cases.
Trunk 1.25.0 consumes native paths in the SARIF path field; URI encoding drops findings for reserved filenames.
This adapter preserves native paths for Trunk and does not promise portable SARIF URI conformance.
Columns use Unicode code points, encoded findings retain file-level diagnostics, and scanner input errors fail the gate with `--fail-on-scan-errors`.
No candidate credential is verified with its provider.
Application source and document fixtures remain unchanged.
