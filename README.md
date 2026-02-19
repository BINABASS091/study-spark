# StudySpark Educational Blog

A simple, student-friendly educational blog for Grade 6-12 assignment help.

## Free Hosting

See [DEPLOY_FREE_HOSTING.md](DEPLOY_FREE_HOSTING.md) for step-by-step publishing on free hosting (GitHub Pages recommended).

## Full System Description

See [BLOG_HOW_IT_WORKS.md](BLOG_HOW_IT_WORKS.md) for a full detailed explanation of how the blog works.

## Included Deliverables

- 1 homepage (`index.html`)
- 3 sample article posts with images and quizzes (opened via `post.html?id=...`)
- Search, subject filter, grade filter, breadcrumbs, related posts
- Q&A comments section (saved in browser localStorage)
- Social sharing (WhatsApp and Facebook)
- Optional worksheet downloads
- Print-friendly article pages

## Project Structure

- `index.html` - Homepage
- `post.html` - Article page template
- `styles.css` - Shared styles and responsive design
- `script.js` - All interaction logic
- `data/posts.js` - Easy-to-edit post content
- `assets/images/` - Post images
- `worksheets/` - Downloadable worksheet templates

## How to Run

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Local server (recommended)

Use a simple local server for best routing behavior.

Python example:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## How to Add a New Post (Non-Technical Friendly)

1. Open `data/posts.js`.
2. Copy one existing post object inside `window.BLOG_POSTS = [ ... ]`.
3. Update these fields:
   - `id` (unique, no spaces)
   - `title`
   - `subject`
   - `gradeBand` (`6-8`, `9-10`, or `11-12`)
   - `date` (YYYY-MM-DD)
   - `excerpt`
   - `intro`, `steps`, `example`, `didYouKnow`
   - `quiz` (`question`, `options`, `answer`, `explanation`)
4. Add a matching image file in `assets/images/` and set the `image` path.
5. (Optional) Add a worksheet in `worksheets/` and set the `worksheet` path.

## How to Add/Change Quiz

In each post object:

- `type`: `mcq` or `tf`
- `options`: possible answers
- `answer`: exact text of correct option
- `explanation`: short explanation shown after checking answer

## SEO and Performance Notes

- Lightweight static files for fast loading
- Semantic headings and metadata in homepage
- Mobile-responsive layout for phone/tablet/desktop
- Lazy-loaded post images

## Current Sample Posts

- Math: Fraction word problems
- Science: Ecosystem food chain
- History: Industrial Revolution causes
- Literature: Poetry analysis paragraph

You can add Literature or other subjects by adding more post objects to `data/posts.js`.
