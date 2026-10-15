# Agent Runtime Governance: site

Next.js (App Router) educational site for the paper. Source of truth is `content/paper.md`;
chapters, figures and captions are parsed from it at build time. Per-chapter summaries,
takeaways and the curriculum live in `lib/chapters.ts`.

    npm install
    npm run dev      # http://localhost:3000
    npm run build

Deploy: import the `site/` directory into Vercel (framework auto-detected).
Set `NEXT_PUBLIC_SITE_URL` to the production URL for correct social-card links.
