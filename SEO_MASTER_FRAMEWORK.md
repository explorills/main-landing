# SEO MASTER FRAMEWORK — ONE ECOSYSTEM

> **AI AGENT DIRECTIVE:** This is your SINGLE SOURCE OF TRUTH for SEO implementation.
> Read this ENTIRE document before making any changes.
> Follow the workflow sequence exactly.

---

## WORKFLOW SEQUENCE

```
1. READ this entire document
2. EXPLORE the current sub-project codebase
3. COMBINE ecosystem context + project-specific details
4. CREATE/UPDATE all SEO files in the codebase
5. REPORT what was implemented
```

---

## ECOSYSTEM OVERVIEW

### Brand Identity

| Attribute | Value |
|-----------|-------|
| **Name** | EXPL.ONE |
| **Tagline** | ONE ecosystem // Powered by EXPL Nodes |
| **Domain** | https://expl.one |
| **Category** | Web3 / Blockchain / Open Source |

### Ecosystem Structure

```
expl.one (Main Landing - Mother Project)
├── pump.expl.one      ← Token Launch Platform (ACTIVE)
├── network.expl.one   ← Blockchain Network (ACTIVE)
├── world.expl.one     ← Metaverse (ACTIVE)
├── node.expl.one      ← EXPL Nodes Purchase Page (ACTIVE)
├── docs.expl.one      ← ONE ecosystem Documentation (ACTIVE)
├── agent.expl.one     ← AI Agents (Coming Soon)
├── chat.expl.one      ← Messaging (Coming Soon)
├── id.expl.one        ← Digital Identity (Coming Soon)
├── venture.expl.one   ← Investment (Coming Soon)
├── care.expl.one      ← Charity (Coming Soon)
├── merch.expl.one     ← Merchandise (Coming Soon)
└── space.expl.one     ← Extended Metaverse (Coming Soon)
```

### Social Links (Use These Exactly)

| Platform | URL |
|----------|-----|
| GitHub | https://github.com/explorills |
| Twitter/X | https://x.com/explorills_main |
| Discord | https://discord.com/invite/RetTCVq7tJ |

### Project Colors

| Project | Hex Color |
|---------|-----------|
| Main (EXPL.ONE) | `#a147e1` |
| Pump | `#16a34a` |
| Network | `#2563eb` |
| World | `#ec4899` |
| Agent | `#dc2626` |
| Chat | `#dfdfdf` |
| ID | `#92400e` |
| Venture | `#facc15` |
| Care | `#64748b` |
| Merch | `#ef5609` |
| Space | `#84cc16` |

---

## UNIVERSAL TRACKING CODE

**Add this to EVERY project's index.html, immediately after `<head>`:**

```html
<!-- Google Analytics 4 - ONE Ecosystem -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3NM3XM3TX2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3NM3XM3TX2');
</script>
```

**This is universal for ALL ecosystem projects. Do NOT create new GA4 properties.**

---

## REQUIRED SEO FILES

Every project MUST have these files:

| File | Location | Purpose |
|------|----------|---------|
| `index.html` | Root | Meta tags, structured data, GA4 |
| `robots.txt` | `/public/` | Crawler instructions |
| `sitemap.xml` | `/public/` | Page index for search engines |
| `site.webmanifest` | `/public/` | PWA manifest |

---

## 1. INDEX.HTML TEMPLATE

Replace `[VARIABLES]` with project-specific values:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8" />
    
    <!-- Google Analytics 4 - ONE Ecosystem -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3NM3XM3TX2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3NM3XM3TX2');
    </script>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>[PROJECT_NAME] - [TAGLINE] | ONE Ecosystem</title>
    <meta name="title" content="[PROJECT_NAME] - [TAGLINE] | ONE Ecosystem" />
    <meta name="description" content="[DESCRIPTION_150_CHARS]. Part of the ONE ecosystem: open source, community-driven. 45% revenue to Node owners, 45% to Creators." />
    <meta name="keywords" content="[PROJECT_KEYWORDS], web3, blockchain, crypto, nodes, EXPL Nodes, decentralized, open source" />
    <meta name="author" content="EXPL.ONE Team" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1" />
    <meta name="theme-color" content="[PROJECT_COLOR]" />
    <meta name="color-scheme" content="dark" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://[SUBDOMAIN].expl.one/" />
    
    <!-- Language -->
    <meta property="og:locale" content="en_US" />
    <link rel="alternate" hreflang="en" href="https://[SUBDOMAIN].expl.one/" />
    <link rel="alternate" hreflang="x-default" href="https://[SUBDOMAIN].expl.one/" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://[SUBDOMAIN].expl.one/" />
    <meta property="og:site_name" content="[PROJECT_NAME]" />
    <meta property="og:title" content="[PROJECT_NAME] - [TAGLINE] | ONE Ecosystem" />
    <meta property="og:description" content="[DESCRIPTION_150_CHARS]" />
    <meta property="og:image" content="https://[SUBDOMAIN].expl.one/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="[PROJECT_NAME] - ONE Ecosystem" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@explorills_main" />
    <meta name="twitter:creator" content="@explorills_main" />
    <meta name="twitter:url" content="https://[SUBDOMAIN].expl.one/" />
    <meta name="twitter:title" content="[PROJECT_NAME] - [TAGLINE]" />
    <meta name="twitter:description" content="[DESCRIPTION_140_CHARS]" />
    <meta name="twitter:image" content="https://[SUBDOMAIN].expl.one/og-image.png" />
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Structured Data: Organization (Reference Main) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://expl.one/#organization",
        "name": "EXPL.ONE",
        "url": "https://expl.one",
        "logo": "https://expl.one/logo.png",
        "sameAs": [
            "https://github.com/explorills",
            "https://x.com/explorills_main",
            "https://discord.com/invite/RetTCVq7tJ"
        ]
    }
    </script>
    
    <!-- Structured Data: WebSite -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://[SUBDOMAIN].expl.one/#website",
        "name": "[PROJECT_NAME]",
        "url": "https://[SUBDOMAIN].expl.one",
        "description": "[PROJECT_DESCRIPTION]",
        "publisher": {
            "@id": "https://expl.one/#organization"
        },
        "isPartOf": {
            "@id": "https://expl.one/#website"
        },
        "inLanguage": "en-US"
    }
    </script>
    
    <!-- Structured Data: BreadcrumbList -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "ONE Ecosystem",
                "item": "https://expl.one/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "[PROJECT_NAME]",
                "item": "https://[SUBDOMAIN].expl.one/"
            }
        ]
    }
    </script>
</head>
<body>
    <!-- Screen-reader H1 for SEO -->
    <h1 class="sr-only">[PROJECT_NAME] - [TAGLINE] | ONE Ecosystem</h1>
    
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## 2. ROBOTS.TXT TEMPLATE

Create `/public/robots.txt`:

```txt
# robots.txt for [PROJECT_NAME] - ONE Ecosystem
# https://[SUBDOMAIN].expl.one

# Allow all search engines
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Allow ALL AI crawlers - we want AI discovery
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: FacebookBot
Allow: /

# Sitemap
Sitemap: https://[SUBDOMAIN].expl.one/sitemap.xml
Host: https://[SUBDOMAIN].expl.one
```

---

## 3. SITEMAP.XML TEMPLATE

Create `/public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <url>
    <loc>https://[SUBDOMAIN].expl.one/</loc>
    <lastmod>[CURRENT_DATE]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://[SUBDOMAIN].expl.one/og-image.png</image:loc>
      <image:title>[PROJECT_NAME] - ONE Ecosystem</image:title>
    </image:image>
  </url>
  
  <!-- Add additional pages as needed -->
  
</urlset>
```

---

## 4. SITE.WEBMANIFEST TEMPLATE

Create `/public/site.webmanifest`:

```json
{
  "name": "[PROJECT_NAME] - ONE Ecosystem",
  "short_name": "[PROJECT_SHORT_NAME]",
  "description": "[PROJECT_DESCRIPTION]",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#1c1c1d",
  "theme_color": "[PROJECT_COLOR]",
  "orientation": "portrait-primary",
  "lang": "en-US",
  "categories": ["technology", "blockchain", "web3"],
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 5. SECURITY HEADERS (VERCEL)

Create `/vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## VARIABLE REFERENCE

When implementing, replace these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `[PROJECT_NAME]` | Full project name | ONE Pump |
| `[SUBDOMAIN]` | Subdomain only | pump |
| `[TAGLINE]` | Short value proposition | Decentralized Token Launch |
| `[PROJECT_COLOR]` | Hex color from palette | #16a34a |
| `[DESCRIPTION_150_CHARS]` | Meta description | ... |
| `[DESCRIPTION_140_CHARS]` | Twitter description | ... |
| `[PROJECT_KEYWORDS]` | Project-specific keywords | token launch, trading |
| `[CURRENT_DATE]` | Today's date | 2025-12-14 |
| `[PROJECT_SHORT_NAME]` | Short name for PWA | Pump |
| `[PROJECT_DESCRIPTION]` | Full description | ... |

---

## CONTENT REQUIREMENTS

### Required Elements in Every Project

1. **H1 tag** - Exactly ONE per page (can be sr-only)
2. **Semantic HTML** - Use `<main>`, `<nav>`, `<section>`, `<footer>`
3. **Alt text** - All images must have descriptive alt attributes
4. **Internal links** - Navigation must use `<a href>`
5. **External links** - Use `rel="noopener noreferrer"` for `target="_blank"`

### Required Footer Links

Every project footer must include:

```html
<footer>
  <!-- Back to ecosystem -->
  <a href="https://expl.one">ONE Ecosystem</a>
  
  <!-- Node info -->
  <a href="https://node.expl.one">EXPL Nodes</a>
  
  <!-- Documentation -->
  <a href="https://docs.expl.one">Documentation</a>
  
  <!-- Social -->
  <a href="https://github.com/explorills">GitHub</a>
  <a href="https://x.com/explorills_main">Twitter</a>
  <a href="https://discord.com/invite/RetTCVq7tJ">Discord</a>
  
  <!-- Powered by badge -->
  <span>Powered by EXPL Nodes</span>
</footer>
```

---

## PERFORMANCE REQUIREMENTS

### Must Implement

| Optimization | How |
|--------------|-----|
| Preconnect | `<link rel="preconnect" href="...">` for critical origins |
| Lazy loading | `loading="lazy"` on below-fold images |
| Image dimensions | Always include `width` and `height` attributes |
| Font display | Use `&display=swap` in Google Fonts URL |

### Target Scores

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |

---

## FORBIDDEN PRACTICES

Do NOT do any of these:

| ❌ Forbidden | Why |
|--------------|-----|
| `meta name="robots" content="noindex"` | Blocks indexing |
| Environment-based SEO logic | Creates inconsistencies |
| Hardcoded domains in code | Breaks multi-subdomain setup |
| Duplicate meta descriptions | Hurts SEO |
| Missing canonical tags | Causes duplicate content |
| Blocking AI crawlers | We WANT AI discovery |

---

## IMPLEMENTATION CHECKLIST

After implementing, verify:

- [ ] GA4 tracking code added (G-3NM3XM3TX2)
- [ ] Title tag present and unique
- [ ] Meta description present (150 chars max)
- [ ] Canonical URL set correctly
- [ ] Open Graph tags complete (8 tags)
- [ ] Twitter Card tags complete (8 tags)
- [ ] Structured data added (Organization reference, WebSite, BreadcrumbList)
- [ ] robots.txt created with AI crawlers allowed
- [ ] sitemap.xml created
- [ ] site.webmanifest created
- [ ] H1 tag present
- [ ] Footer links to ecosystem present
- [ ] All images have alt text
- [ ] No console errors

---

## REPORT FORMAT

After implementation, report:

```markdown
## SEO Implementation Complete

### Project: [PROJECT_NAME]
### Subdomain: [SUBDOMAIN].expl.one

### Files Created/Updated:
- index.html: [META TAGS, STRUCTURED DATA, GA4]
- public/robots.txt: [CREATED]
- public/sitemap.xml: [CREATED]
- public/site.webmanifest: [CREATED]
- vercel.json: [CREATED]

### Meta Tags:
- Title: "[EXACT TITLE]"
- Description: "[EXACT DESCRIPTION]"

### Structured Data:
- Organization: Referenced from expl.one
- WebSite: Created
- BreadcrumbList: Created

### Checklist: All items complete ✅
```

---

## MAIN LANDING REFERENCE

The main landing (expl.one) implements:

- **5 structured data schemas**: Organization, WebSite, FAQPage, SoftwareApplication, BreadcrumbList
- **Full meta tags**: Title, description, keywords, OG (8 tags), Twitter (8 tags)
- **15+ AI crawlers allowed** in robots.txt
- **Security headers**: HSTS, CSP, X-Frame-Options, etc.
- **Performance**: Preconnect, lazy-load, font optimization

Sub-projects should match this quality level.

---

**Document Version:** 2.0.0  
**Last Updated:** December 14, 2025  
**Ecosystem:** ONE Ecosystem // Powered by EXPL Nodes  
**Main Domain:** https://expl.one
