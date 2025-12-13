# SEO MASTER FRAMEWORK – ONE ECOSYSTEM

**Document Version:** 2.0.0  
**Last Updated:** December 13, 2025  
**Status:** Production-Ready  
**Ecosystem:** ONE Ecosystem by Explorills  

> **AI Agent Directive:** This document is the SINGLE SOURCE OF TRUTH for SEO across ALL ONE ecosystem projects. Read it completely before implementing any SEO changes. Following this framework ensures 100% SEO compliance with zero manual intervention.

---

## 📋 TABLE OF CONTENTS

1. [Quick Start Checklist](#1-quick-start-checklist)
2. [Third-Party SEO Toolkit](#2-third-party-seo-toolkit)
3. [Metadata Implementation](#3-metadata-implementation)
4. [Structured Data Schemas](#4-structured-data-schemas)
5. [Technical SEO Files](#5-technical-seo-files)
6. [Security Headers Configuration](#6-security-headers-configuration)
7. [Performance & Core Web Vitals](#7-performance--core-web-vitals)
8. [Project Intelligence Archive](#8-project-intelligence-archive)
9. [Reusable Templates for Sub-Projects](#9-reusable-templates-for-sub-projects)
10. [Ecosystem Integration Protocol](#10-ecosystem-integration-protocol)
11. [AI Agent Workflow Instructions](#11-ai-agent-workflow-instructions)
12. [Validation & Monitoring](#12-validation--monitoring)

---

## 1. QUICK START CHECKLIST

### Status Overview

| ✅ Completed | 🔧 Action Required | File/Tool |
|-------------|-------------------|-----------|
| ✔️ Core meta tags (title, description, keywords, OG, Twitter) | — | `index.html` |
| ✔️ Structured data (Organization, WebSite, FAQ, SoftwareApplication, BreadcrumbList) | — | `index.html` |
| ✔️ robots.txt with sitemap reference | — | `public/robots.txt` |
| ✔️ sitemap.xml with priority/frequency | — | `public/sitemap.xml` |
| ✔️ sitemap-index.xml for ecosystem coordination | — | `public/sitemap-index.xml` |
| ✔️ Web-App manifest, favicon set | — | `public/site.webmanifest` |
| ✔️ HSTS & CSP security headers | — | `vercel.json` |
| ✔️ Performance optimizations (preconnect, lazy-load, critical CSS) | — | `index.html` |
| ✔️ hreflang tags for locale defaults | — | `index.html` |
| 🔧 Connect Google Search Console | Submit sitemap, verify property | GSC Dashboard |
| 🔧 Connect Bing Webmaster Tools | Submit sitemap, verify property | Bing Dashboard |
| 🔧 Set up rank tracking | Keywords: crypto, blockchain, web3, nodes | SEO Tool Dashboard |
| 🔧 Install crawl analysis tools | Screaming Frog or Sitebulb | Local Machine |

### First-Time Setup Commands

```bash
# 1. Verify all SEO files exist
ls -la public/robots.txt public/sitemap.xml public/sitemap-index.xml public/site.webmanifest

# 2. Validate structured data (use browser or API)
# Open: https://validator.schema.org/
# Paste your index.html content

# 3. Test robots.txt
curl https://expl.one/robots.txt

# 4. Submit sitemap to Google (requires GSC API token)
# See Section 2 for detailed setup
```

---

## 2. THIRD-PARTY SEO TOOLKIT

### Essential Tools (Required)

| Tool | Purpose | Free/Paid | Setup Instructions |
|------|---------|-----------|-------------------|
| **Google Search Console** | Index monitoring, coverage, performance, rich results, sitemap submission | Free | 1. Go to https://search.google.com/search-console<br>2. Add property: `https://expl.one`<br>3. Verify via DNS TXT record or HTML file<br>4. Submit sitemap: `https://expl.one/sitemap.xml` |
| **Bing Webmaster Tools** | Complementary index for Microsoft/Edge users | Free | 1. Go to https://www.bing.com/webmasters<br>2. Import from GSC or add manually<br>3. Submit sitemap |
| **Schema.org Validator** | Verify JSON-LD structured data | Free | https://validator.schema.org/<br>Paste HTML or URL |
| **Google Rich Results Test** | Preview rich snippets in search | Free | https://search.google.com/test/rich-results |
| **Facebook Sharing Debugger** | OG tag validation & cache refresh | Free | https://developers.facebook.com/tools/debug/ |
| **Twitter Card Validator** | Twitter card preview | Free | https://cards-dev.twitter.com/validator |

### Performance Analysis Tools (Required)

| Tool | Purpose | Free/Paid | Target Metrics |
|------|---------|-----------|----------------|
| **Google PageSpeed Insights** | Core Web Vitals, performance score | Free | Performance ≥ 90, SEO = 100 |
| **GTmetrix** | Deep performance waterfall analysis | Free tier | LCP < 2.5s, CLS < 0.1 |
| **WebPageTest** | Multi-location performance testing | Free | Consistent global performance |
| **Chrome Lighthouse** | Full audit (Performance, A11y, SEO, Best Practices) | Free | All scores ≥ 90 |

### Crawl & Backlink Analysis (Recommended)

| Tool | Purpose | Free/Paid | Key Features |
|------|---------|-----------|--------------|
| **Screaming Frog SEO Spider** | Crawl audit, broken links, duplicates, redirects | Free (500 URLs) / Paid | `brew install screamingfrog` (Mac)<br>Windows: Download installer |
| **Sitebulb** | Visual crawl reports, Core Web Vitals diagnostics | Paid (30-day trial) | Best for visual audits |
| **Ahrefs** | Backlink analysis, keyword tracking, competitor research | Paid (subscription) | Track: crypto, blockchain, web3, nodes, decentralized |
| **SEMrush** | Keyword research, rank tracking, site audit | Paid (subscription) | Alternative to Ahrefs |
| **MozBar** | Quick on-page SEO analysis (Chrome extension) | Free | Title length, meta, H1 count |

### Automated Commands for AI Agents

```bash
# Crawl site with Screaming Frog (headless mode)
screamingfrog --crawl https://expl.one --headless --export-format csv --output-folder ./seo-reports/

# Submit sitemap via Google Search Console API (requires OAuth token)
curl -X POST \
  -H "Authorization: Bearer $GSC_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"siteUrl":"https://expl.one","feedpath":"https://expl.one/sitemap.xml"}' \
  "https://searchconsole.googleapis.com/v1/urlNotifications:publish"

# Test PageSpeed (via API)
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://expl.one&key=$PAGESPEED_API_KEY"
```

---

## 3. METADATA IMPLEMENTATION

### Complete HTML Head (Copy to index.html)

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    
    <!-- ====== PRIMARY META TAGS ====== -->
    <title>EXPL.ONE – Open Source Web3 Ecosystem | One Perfect Tool Per Category</title>
    <meta name="title" content="EXPL.ONE – Open Source Web3 Ecosystem | One Perfect Tool Per Category" />
    <meta name="description" content="Join the ONE ecosystem: open-source, community-driven Web3 tools. Build with purpose, own with EXPL Nodes, and share 40% of all revenue. Pump, Network, World & more." />
    <meta name="keywords" content="web3, blockchain, crypto, nodes, EXPL Nodes, decentralized, open source, community driven, token launch, blockchain network, metaverse, crypto charity, Web3 ecosystem, decentralized tools" />
    <meta name="author" content="EXPL.ONE Team" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="theme-color" content="#a147e1" />
    <meta name="color-scheme" content="dark" />
    <meta name="msapplication-TileColor" content="#a147e1" />
    <meta name="format-detection" content="telephone=no" />
    
    <!-- ====== CANONICAL URL ====== -->
    <link rel="canonical" href="https://expl.one/" />
    
    <!-- ====== LANGUAGE & LOCALE ====== -->
    <meta property="og:locale" content="en_US" />
    <link rel="alternate" hreflang="en" href="https://expl.one/" />
    <link rel="alternate" hreflang="x-default" href="https://expl.one/" />
    <!-- Future locales (uncomment when available):
    <link rel="alternate" hreflang="es" href="https://es.expl.one/" />
    <link rel="alternate" hreflang="zh" href="https://zh.expl.one/" />
    -->
    
    <!-- ====== OPEN GRAPH / FACEBOOK ====== -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://expl.one/" />
    <meta property="og:site_name" content="EXPL.ONE" />
    <meta property="og:title" content="EXPL.ONE – Open Source Web3 Ecosystem | One Perfect Tool Per Category" />
    <meta property="og:description" content="Join the ONE ecosystem: open-source, community-driven Web3 tools. Build with purpose, own with EXPL Nodes, and share 40% of all revenue." />
    <meta property="og:image" content="https://expl.one/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="EXPL.ONE – ONE Ecosystem for Web3" />
    
    <!-- ====== TWITTER CARD ====== -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@explorills_main" />
    <meta name="twitter:creator" content="@explorills_main" />
    <meta name="twitter:url" content="https://expl.one/" />
    <meta name="twitter:title" content="EXPL.ONE – Open Source Web3 Ecosystem" />
    <meta name="twitter:description" content="Open-source, community-driven Web3 tools. Build with purpose, own with EXPL Nodes, share 40% revenue." />
    <meta name="twitter:image" content="https://expl.one/og-image.png" />
    <meta name="twitter:image:alt" content="EXPL.ONE – ONE Ecosystem for Web3" />
    
    <!-- ====== FAVICONS ====== -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="shortcut icon" href="/logo.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a147e1" />
    
    <!-- ====== WEB APP MANIFEST ====== -->
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- ====== PRECONNECT / DNS PREFETCH ====== -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://api-landing.expl.one" crossorigin />
    <link rel="dns-prefetch" href="https://api-landing.expl.one" />
    
    <!-- ====== FONTS (with display=swap) ====== -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    
    <!-- ====== STYLES ====== -->
    <link href="/src/main.css" rel="stylesheet" />
    
    <!-- ====== STRUCTURED DATA (See Section 4) ====== -->
    <!-- Organization, WebSite, FAQPage, SoftwareApplication, BreadcrumbList -->
</head>
<body>
    <!-- Screen-reader only H1 for SEO -->
    <h1 class="sr-only">EXPL.ONE – Open Source Web3 Ecosystem</h1>
    
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### Key Changes from v1.0

| Issue | Fix Applied |
|-------|-------------|
| Duplicate `max-snippet:-1` in robots meta | Removed redundant directive |
| Keywords not optimized for generic search | Added: crypto, blockchain, nodes, Web3, decentralized |
| Missing hreflang for future locales | Added placeholder comments for expansion |
| No srcset guidance | Added in Performance section |

---

## 4. STRUCTURED DATA SCHEMAS

### 4.1 Organization Schema (Single Definition)

```json
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://expl.one/#organization",
    "name": "EXPL.ONE",
    "alternateName": ["ONE Ecosystem", "Explorills"],
    "url": "https://expl.one",
    "logo": {
        "@type": "ImageObject",
        "url": "https://expl.one/logo.png",
        "width": 512,
        "height": 512
    },
    "description": "Open source, community-driven Web3 ecosystem building ONE perfect tool per category.",
    "foundingDate": "2024",
    "sameAs": [
        "https://github.com/explorills",
        "https://x.com/explorills_main",
        "https://discord.com/invite/RetTCVq7tJ"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Community Support",
        "url": "https://discord.com/invite/RetTCVq7tJ"
    }
}
```

### 4.2 WebSite Schema (References Organization)

```json
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://expl.one/#website",
    "name": "EXPL.ONE – ONE Ecosystem",
    "url": "https://expl.one",
    "description": "Open source, community-driven Web3 ecosystem building ONE perfect tool per category.",
    "publisher": {
        "@id": "https://expl.one/#organization"
    },
    "inLanguage": "en-US"
}
```

### 4.3 FAQPage Schema

```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://expl.one/#faq",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does ONE exist?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We're escaping digital chaos. Instead of thousands of mediocre apps drowning in AI slop and endless options, we build ONE perfect tool per category. Quality over quantity. Singularity over noise."
            }
        },
        {
            "@type": "Question",
            "name": "What is an EXPL Node?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A stake in the entire ONE ecosystem. One Node = ownership in all projects and 40% of total revenue."
            }
        },
        {
            "@type": "Question",
            "name": "How is ONE different?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We're open source, community-driven, and non-capitalistic. No profit-hungry tech giants here - we create what we love because the purpose IS the creation."
            }
        },
        {
            "@type": "Question",
            "name": "What do Node owners get?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "40% of ALL revenue from every project. Not one app - the entire ecosystem. You're not just a user, you're a co-owner."
            }
        },
        {
            "@type": "Question",
            "name": "How does revenue work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simple: 40% to Node owners (you), 50% to ONE care (charity), 10% to founders. Fair economics powered by Web3."
            }
        },
        {
            "@type": "Question",
            "name": "How many Nodes exist?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "1 million total across three batches: 12k (first), 88k (second), 900k (third). Get in early for ecosystem ownership."
            }
        },
        {
            "@type": "Question",
            "name": "How transparent is ONE?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Fully open source on GitHub. Every line of code, every decision, every commit - public. No hidden agendas, no corporate secrecy."
            }
        }
    ]
}
```

### 4.4 SoftwareApplication Schema

```json
{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://expl.one/#software",
    "name": "ONE Ecosystem",
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "BlockchainPlatform",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free, open-source Web3 toolkit."
    },
    "author": {
        "@id": "https://expl.one/#organization"
    },
    "description": "Full suite of decentralized tools: Pump, Network, World, and more.",
    "url": "https://expl.one",
    "downloadUrl": "https://github.com/explorills",
    "softwareVersion": "1.0.0"
}
```

### 4.5 BreadcrumbList Schema

```json
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://expl.one/"
        }
    ]
}
```

---

## 5. TECHNICAL SEO FILES

### 5.1 robots.txt (`public/robots.txt`)

```txt
# robots.txt for EXPL.ONE - ONE Ecosystem
# https://expl.one
# Last Updated: 2025-12-13

# ==========================================
# ALLOW ALL SEARCH ENGINE CRAWLERS
# ==========================================
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# ==========================================
# AI TRAINING CRAWLERS
# OPTION A: ALLOW (currently active)
# OPTION B: BLOCK (uncomment to activate)
# ==========================================

# --- OPTION A: ALLOW ---
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

# --- OPTION B: BLOCK (uncomment if needed) ---
# User-agent: GPTBot
# Disallow: /

# ==========================================
# SEO/ANALYSIS BOTS
# ==========================================
User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

# ==========================================
# SITEMAP & HOST
# ==========================================
Sitemap: https://expl.one/sitemap.xml
Sitemap: https://expl.one/sitemap-index.xml
Host: https://expl.one
```

### 5.2 sitemap.xml (`public/sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://expl.one/</loc>
    <lastmod>2025-12-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://expl.one/og-image.png</image:loc>
      <image:title>EXPL.ONE – ONE Ecosystem</image:title>
    </image:image>
  </url>

  <url>
    <loc>https://expl.one/#why-node</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://expl.one/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://expl.one/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://expl.one/#faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

### 5.3 sitemap-index.xml (`public/sitemap-index.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Main Landing Page -->
  <sitemap>
    <loc>https://expl.one/sitemap.xml</loc>
    <lastmod>2025-12-13</lastmod>
  </sitemap>
  
  <!-- Add sub-project sitemaps as they go live -->
  <!--
  <sitemap><loc>https://pump.expl.one/sitemap.xml</loc></sitemap>
  <sitemap><loc>https://network.expl.one/sitemap.xml</loc></sitemap>
  <sitemap><loc>https://world.expl.one/sitemap.xml</loc></sitemap>
  -->
  
</sitemapindex>
```

### 5.4 site.webmanifest (`public/site.webmanifest`)

```json
{
  "name": "EXPL.ONE – ONE Ecosystem",
  "short_name": "EXPL.ONE",
  "description": "Open source, community-driven Web3 ecosystem building ONE perfect tool per category.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#1c1c1d",
  "theme_color": "#a147e1",
  "orientation": "portrait-primary",
  "lang": "en-US",
  "categories": ["technology", "blockchain", "developer-tools", "web3"],
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    { "name": "Projects", "url": "/#projects" },
    { "name": "About ONE", "url": "/#about" },
    { "name": "FAQ", "url": "/#faq" }
  ]
}
```

---

## 6. SECURITY HEADERS CONFIGURATION

### Vercel Configuration (`vercel.json`)

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
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://api-landing.expl.one https://api.github.com; frame-ancestors 'none'"
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
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Cloudflare Alternative

If using Cloudflare instead of Vercel, add these headers via Page Rules or Transform Rules:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 7. PERFORMANCE & CORE WEB VITALS

### Target Scores

| Metric | Target | Tool to Verify |
|--------|--------|----------------|
| Lighthouse Performance | ≥ 90 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse Best Practices | ≥ 95 | Chrome DevTools |
| Lighthouse SEO | 100 | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |

### Performance Optimizations Checklist

| Optimization | Implementation | Status |
|-------------|----------------|--------|
| Preconnect to fonts | `<link rel="preconnect" href="https://fonts.googleapis.com">` | ✅ |
| Preconnect to API | `<link rel="preconnect" href="https://api-landing.expl.one">` | ✅ |
| DNS prefetch | `<link rel="dns-prefetch" href="https://api-landing.expl.one">` | ✅ |
| Font display swap | `&display=swap` in Google Fonts URL | ✅ |
| Lazy load images | `loading="lazy"` on below-fold images | ✅ |
| Hero image priority | `fetchpriority="high"` on hero image | ✅ |
| Image dimensions | `width` and `height` attributes on all images | ✅ |
| Static asset caching | 1 year cache via `vercel.json` | ✅ |
| HTML caching | 5 minutes via `vercel.json` | ✅ |
| Critical CSS | Tailwind purge + minification | ✅ |

### Responsive Images with srcset

```html
<!-- Example for OG/Hero image -->
<img 
  src="/og-image.png"
  srcset="/og-image-600.png 600w, /og-image-1200.png 1200w"
  sizes="(max-width: 600px) 600px, 1200px"
  alt="EXPL.ONE – ONE Ecosystem"
  width="1200"
  height="630"
  fetchpriority="high"
/>

<!-- Below-fold images -->
<img 
  src="/feature-image.png"
  alt="Feature description"
  width="800"
  height="450"
  loading="lazy"
/>
```

---

## 8. PROJECT INTELLIGENCE ARCHIVE

### 8.1 Project Overview

| Attribute | Value |
|-----------|-------|
| **Project Name** | EXPL.ONE – ONE Ecosystem Landing Page |
| **Domain** | https://expl.one |
| **Category** | Web3 / Blockchain / Open Source Platform |
| **Tech Stack** | React 19 + TypeScript + Vite 7 + Tailwind CSS 4 |

### 8.2 Target Keywords (Prioritized)

| Priority | Keywords | Search Intent |
|----------|----------|---------------|
| **High** | web3, blockchain, crypto, nodes, decentralized | Generic discovery |
| **High** | EXPL Nodes, blockchain nodes, crypto nodes | Product-specific |
| **Medium** | open source blockchain, community-driven crypto | Differentiation |
| **Medium** | token launch platform, blockchain network | Feature-specific |
| **Long-tail** | "one perfect tool per category", "40% revenue sharing crypto" | Brand phrases |

### 8.3 Ecosystem Structure

```
expl.one (Main Landing) ← THIS PROJECT
├── pump.expl.one (Token Launch Platform)
├── network.expl.one (Blockchain Network)
├── world.expl.one (Metaverse)
├── node.expl.one (EXPL Nodes Dashboard)
├── docs.expl.one (Documentation)
├── agent.expl.one (AI Agents - Coming Soon)
├── chat.expl.one (Messaging - Coming Soon)
├── id.expl.one (Digital Identity - Coming Soon)
├── venture.expl.one (Investment - Coming Soon)
├── care.expl.one (Charity - Coming Soon)
├── merch.expl.one (Merchandise - Coming Soon)
└── space.expl.one (Extended Metaverse - Coming Soon)
```

### 8.4 Brand Voice & Tone

- **Rebellious:** Against corporate tech monopolies
- **Transparent:** Every line of code is public
- **Community-First:** "The community decides what's worth building"
- **Purposeful:** "The purpose IS the creation"
- **Bold:** "No hidden agendas, no corporate secrecy"

### 8.5 Visual Identity

| Element | Value |
|---------|-------|
| Primary Color | `#a147e1` (Purple) |
| Background | `#1c1c1d` (Dark charcoal) |
| Primary Font | Space Grotesk (300-700) |
| Monospace Font | JetBrains Mono (400-500) |

---

## 9. REUSABLE TEMPLATES FOR SUB-PROJECTS

### 9.1 Meta Tags Template

```html
<!-- Replace [VARIABLES] with project-specific values -->
<title>[PROJECT_NAME] – [TAGLINE] | ONE Ecosystem</title>
<meta name="title" content="[PROJECT_NAME] – [TAGLINE] | ONE Ecosystem" />
<meta name="description" content="[DESCRIPTION_155_CHARS]. Part of the ONE ecosystem: open source, community-driven, 40% revenue to Node owners." />
<meta name="keywords" content="[PRIMARY_KEYWORDS], EXPL ONE, Web3 ecosystem, blockchain, nodes" />
<meta name="theme-color" content="[PROJECT_COLOR]" />
<link rel="canonical" href="https://[SUBDOMAIN].expl.one/" />

<!-- OG Tags -->
<meta property="og:url" content="https://[SUBDOMAIN].expl.one/" />
<meta property="og:site_name" content="[PROJECT_NAME]" />
<meta property="og:title" content="[PROJECT_NAME] – [TAGLINE] | ONE Ecosystem" />
<meta property="og:description" content="[DESCRIPTION_155_CHARS]" />
<meta property="og:image" content="https://[SUBDOMAIN].expl.one/og-image.png" />

<!-- Twitter Tags -->
<meta name="twitter:url" content="https://[SUBDOMAIN].expl.one/" />
<meta name="twitter:title" content="[PROJECT_NAME] – [TAGLINE]" />
<meta name="twitter:description" content="[DESCRIPTION_140_CHARS]" />
<meta name="twitter:image" content="https://[SUBDOMAIN].expl.one/og-image.png" />
```

### 9.2 Sub-Project Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `[PROJECT_NAME]` | Full project name | ONE pump |
| `[SUBDOMAIN]` | Subdomain without .expl.one | pump |
| `[TAGLINE]` | Short value proposition | Decentralized Token Launch Platform |
| `[PROJECT_COLOR]` | Hex color from palette | #16a34a (green for pump) |
| `[DESCRIPTION_155_CHARS]` | Meta description (max 155 chars) | — |
| `[DESCRIPTION_140_CHARS]` | Twitter description (max 140 chars) | — |
| `[PRIMARY_KEYWORDS]` | 3-5 project-specific keywords | token launch, decentralized trading, pump crypto |

### 9.3 Project Color Palette

| Project | Color | Hex |
|---------|-------|-----|
| Main (EXPL.ONE) | Purple | `#a147e1` |
| Pump | Green | `#16a34a` |
| Network | Blue | `#2563eb` |
| World | Pink | `#ec4899` |
| Agent | Red | `#dc2626` |
| Chat | Light Gray | `#dfdfdf` |
| ID | Brown | `#92400e` |
| Venture | Yellow | `#facc15` |
| Care | Slate | `#64748b` |
| Merch | Orange | `#ef5609` |
| Space | Lime | `#84cc16` |

### 9.4 WebSite Schema for Sub-Projects

```json
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
```

### 9.5 BreadcrumbList for Sub-Projects

```json
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
```

---

## 10. ECOSYSTEM INTEGRATION PROTOCOL

### 10.1 Required Cross-Links

**From Sub-Projects to Main:**
- Footer: Link to `expl.one`
- Footer: Link to `node.expl.one`
- Footer: Link to `docs.expl.one`
- Header: "Part of ONE Ecosystem" badge → `expl.one`
- About section: Reference to ecosystem philosophy

**From Main to Sub-Projects:**
- Projects section: Links to all active sub-projects
- Footer: Active project links
- Structured data: `isPartOf` relationships

### 10.2 Sitemap Coordination

When launching a new sub-project:

1. Create `public/sitemap.xml` for the sub-project
2. Add entry to main `public/sitemap-index.xml`:
   ```xml
   <sitemap>
     <loc>https://[SUBDOMAIN].expl.one/sitemap.xml</loc>
     <lastmod>YYYY-MM-DD</lastmod>
   </sitemap>
   ```
3. Submit updated sitemap-index to GSC

### 10.3 Brand Consistency Checklist

- [ ] Uses Space Grotesk + JetBrains Mono fonts
- [ ] Uses assigned project color from palette
- [ ] Dark background (#1c1c1d or similar)
- [ ] "Powered by EXPL Nodes" component in footer
- [ ] Links back to main ecosystem
- [ ] Consistent structured data referencing main Organization

---

## 11. AI AGENT WORKFLOW INSTRUCTIONS

### 11.1 When You Receive This Document

```
DIRECTIVE FOR AI AGENTS:

1. READ the entire document to understand:
   - Ecosystem context and brand guidelines
   - Target keywords and SEO strategy
   - Technical implementation standards

2. FOR MAIN PROJECT (expl.one):
   - Verify all files exist (index.html, robots.txt, sitemap.xml, etc.)
   - Validate structured data with schema.org validator
   - Run Lighthouse audit and fix any issues < 90 score

3. FOR SUB-PROJECTS:
   - Copy templates from Section 9
   - Replace [VARIABLES] with project specifics
   - Reference main Organization schema (don't redefine)
   - Add project sitemap to sitemap-index.xml
   - Maintain brand consistency per Section 10

4. NEVER:
   - Redefine the Organization schema (always reference via @id)
   - Use duplicate meta directives
   - Skip structured data validation
   - Launch without GSC/Bing submission
```

### 11.2 Implementation Order

1. **Meta tags** → Apply from Section 3
2. **Structured data** → Apply from Section 4
3. **Technical files** → Create from Section 5
4. **Security headers** → Apply from Section 6
5. **Performance** → Verify from Section 7
6. **Cross-links** → Implement from Section 10
7. **Validation** → Use tools from Section 12
8. **Submit** → GSC + Bing Webmaster

### 11.3 Output Format After Implementation

```markdown
## SEO Implementation Summary for [PROJECT_NAME]

### Files Created/Modified
- index.html: [CHANGES]
- public/robots.txt: [CREATED/UPDATED]
- public/sitemap.xml: [CREATED/UPDATED]
- public/site.webmanifest: [CREATED/UPDATED]
- vercel.json: [CREATED/UPDATED]

### Meta Tags
- Title: "[EXACT_TITLE]"
- Description: "[EXACT_DESCRIPTION]"
- Keywords: [COUNT] keywords

### Structured Data
- Organization: [REFERENCED/CREATED]
- WebSite: [CREATED]
- BreadcrumbList: [CREATED]
- FAQPage: [CREATED if applicable]

### Validation Results
- Schema.org: [PASS/ISSUES]
- Lighthouse SEO: [SCORE]
- Rich Results Test: [PASS/ISSUES]

### Next Steps for User
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up rank tracking for target keywords
```

---

## 12. VALIDATION & MONITORING

### Pre-Launch Checklist

#### Content & Structure
- [ ] All pages have unique titles (50-60 chars)
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] H1 tag present (can be sr-only)
- [ ] Heading hierarchy is logical (H1 > H2 > H3)
- [ ] No broken links (404s)
- [ ] No duplicate content

#### Technical
- [ ] HTTPS only (HTTP redirects to HTTPS)
- [ ] www/non-www consistent
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible and valid
- [ ] Canonical tags correct
- [ ] Mobile responsive
- [ ] Page speed > 90

#### Structured Data
- [ ] Organization schema present
- [ ] WebSite schema present
- [ ] BreadcrumbList schema present
- [ ] All schemas validate
- [ ] Rich results test passes

#### Images
- [ ] All images have alt text
- [ ] Images have width/height
- [ ] Below-fold images lazy loaded
- [ ] OG image exists (1200x630)
- [ ] Favicon set complete

#### Security
- [ ] HSTS header enabled
- [ ] CSP header configured
- [ ] X-Frame-Options: DENY
- [ ] No mixed content

### Post-Launch Checklist

- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Verified structured data in GSC
- [ ] Crawl errors monitored
- [ ] 404 monitoring set up
- [ ] Rank tracking configured for: crypto, blockchain, web3, nodes, EXPL Nodes
- [ ] Core Web Vitals monitored
- [ ] Social sharing tested (OG/Twitter cards)

### Validation URLs

| Tool | URL |
|------|-----|
| Google Rich Results Test | https://search.google.com/test/rich-results |
| Schema.org Validator | https://validator.schema.org/ |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ |
| Twitter Card Validator | https://cards-dev.twitter.com/validator |
| PageSpeed Insights | https://pagespeed.web.dev/ |
| WAVE Accessibility | https://wave.webaim.org/ |
| SSL Labs | https://www.ssllabs.com/ssltest/ |
| Security Headers | https://securityheaders.com/ |

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-12 | Initial framework creation |
| 2.0.0 | 2025-12-13 | Major revision: Added third-party SEO toolkit, security headers (HSTS/CSP), sitemap-index.xml, cleaned robots meta, improved keywords for generic search terms, consolidated @id references, added AI agent workflow instructions, added validation section |

---

**Document maintained by:** EXPL.ONE Team  
**Repository:** https://github.com/explorills/main-landing  
**License:** MIT

> **Result:** By following this framework, AI agents and developers can implement 100% SEO compliance without manual intervention. Just follow the instructions, use the templates, and validate with the provided tools.
