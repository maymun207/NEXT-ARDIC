# CompanyTech AI Knowledge Documents

Drop any PDF files in this folder and the Company Agent will automatically read them.

## How it works

- All `.pdf` files in this folder are automatically parsed and injected into the agent's knowledge
- Combined with the markdown files in `../knowledge/`
- No restart needed — changes take effect on next request (in development)

## Tips

- Export your NotebookLM source documents as PDFs and paste them here
- Use clear, descriptive filenames (e.g. `Company-platform-overview.pdf`)
- Large PDFs are trimmed to 50,000 characters to stay within token limits
- The agent reads both this folder AND `../knowledge/*.md`

## Supported formats

- PDF (`.pdf`) — text is extracted from the document
- If a PDF is scanned/image-based, text extraction may be limited
