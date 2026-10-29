# Quality Tooling Refresh Plan

## Work

1. Verify repository identity, instructions, current changes and Oracle precedent.
2. Refresh compatible dependency and linter versions with existing package managers.
3. Run the declared local gates and `trunk check --all --no-fix`.
4. Reconcile affected knowledge and review the scoped candidate.
5. Commit locally and prepare visible evidence before requesting publication approval.

## Declared Gates

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm build`

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

Run `python3 -B .trunk/configs/tests/test_trufflehog_to_sarif.py` to exercise the 17 filesystem JSONL diagnostic reader cases.
Trunk 1.25.0 consumes native paths in the SARIF path field; URI encoding drops findings for reserved filenames.
This adapter preserves native paths for Trunk and does not promise portable SARIF URI conformance.
Columns use Unicode code points, encoded findings retain file-level diagnostics, and scanner input errors fail the gate with `--fail-on-scan-errors`.
No candidate credential is verified with its provider.
Application source and document fixtures remain unchanged.

Source-location analysis reads at most 1 MiB plus one sentinel byte per file and caches at most eight files.
Oversized sources retain file-level findings without a region.
These limits bound source context; they do not bound all result memory or guarantee that filesystem I/O cannot block.
