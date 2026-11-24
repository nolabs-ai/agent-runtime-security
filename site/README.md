# Agent Runtime Security: site

Next.js (App Router) educational site for the paper. Source of truth is `../paper/paper.md`;
chapters, figures and captions are parsed from it at build time. Per-chapter summaries,
takeaways and the curriculum live in `lib/chapters.ts`.

    npm install
    npm run dev      # http://localhost:3000
    npm run build

Deploy: import the repository into Vercel with `site` as the root directory, and keep
"Include files outside the root directory" enabled so the build can read `../paper/paper.md`.
Set `NEXT_PUBLIC_SITE_URL` to the production URL for correct social-card links.
