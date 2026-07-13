# Deployment Guide

This project is designed for static deployment on the free Cloudflare Pages tier.

## Push to GitHub

The public repository lives at:

```text
https://github.com/yangnan-web-projects/free-ai-audio-transcriber
```

The local `public/models/` directory is intentionally ignored. Model weights are
large browser assets and are loaded from Hugging Face on first use instead of
being committed to GitHub.

```bash
git init
git add .
git commit -m "Initial Free AI Audio Transcriber MVP"
git branch -M main
git remote add origin https://github.com/yangnan-web-projects/free-ai-audio-transcriber.git
git push -u origin main
```

## Connect to Cloudflare Pages

1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Choose **Create application**.
4. Choose **Pages**.
5. Connect your GitHub account and select the repository.

## Build Settings

Framework preset: Astro

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

Environment variable:

```bash
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_GITHUB_URL=https://github.com/yangnan-web-projects/free-ai-audio-transcriber
PUBLIC_TRANSFORMERS_REMOTE_HOST=https://huggingface.co
```

Do not set `PUBLIC_TRANSFORMERS_LOCAL_MODEL_PATH` in production unless you host
the model files yourself. Leaving it unset keeps model delivery remote while
audio and video processing stays local in the visitor's browser.

## Custom Domain

1. Open the Cloudflare Pages project.
2. Go to **Custom domains**.
3. Add your domain or subdomain.
4. Follow Cloudflare DNS instructions.
5. Update `PUBLIC_SITE_URL` to the final production URL.
6. Redeploy so canonical URLs and sitemap URLs match the domain.

## Google Search Console

1. Add your domain property in Google Search Console.
2. Verify ownership through DNS or the recommended method.
3. Open **Sitemaps**.
4. Submit:

```text
https://your-domain.com/sitemap-index.xml
```

The site also publishes crawlable language-specific home pages. English uses
the root `/`; the other language paths are `/zh-cn/`, `/zh-tw/`, `/ja/`,
`/ko/`, `/es/`, `/fr/`, and `/de/`. Each localized homepage has its own
canonical URL and `hreflang` links while keeping the same tool layout.

After deployment, request indexing for the root page and the most important
localized pages. Search engines decide independently when to crawl and rank a
new site; sitemap submission improves discovery but does not guarantee a
ranking or immediate inclusion.

## Bing Webmaster Tools

Add the production URL in [Bing Webmaster Tools](https://www.bing.com/webmasters/)
and submit the same `sitemap-index.xml`. Bing can also import a verified site
and sitemap from Google Search Console.

## Baidu Search Resource Platform

If you later target Baidu search, create a Baidu Search Resource Platform account, verify the domain, and submit the sitemap URL. If the site is hosted outside mainland China, ICP filing is not required for this MVP, but mainland indexing and speed can vary.
