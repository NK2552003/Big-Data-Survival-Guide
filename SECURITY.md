# Security Policy

## Supported Content

This repository mainly contains educational Markdown notes and shell scripts.

Security-sensitive areas include:

- Installation and automation scripts in `Big Data ( Full Course)/Scripts/`
- Any commands involving cloud credentials or access keys

## Reporting a Vulnerability

If you discover a security issue:

1. Do not publish exploit details publicly.
2. Open a private issue with:
   - A clear description
   - Affected file(s)
   - Steps to reproduce
   - Suggested mitigation (if available)

## Response Process

Maintainers will:

- Acknowledge the report
- Validate impact
- Patch or remove vulnerable instructions/scripts
- Publish a fix note in `CHANGELOG.md`

## Best Practices for Users

- Never commit real credentials, tokens, or keys.
- Use environment variables for secrets.
- Review shell scripts before running them.
- Use least-privilege IAM/cloud permissions.
