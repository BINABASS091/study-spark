# Free Hosting Guide (Recommended: GitHub Pages)

This project is already configured for free hosting on GitHub Pages.

## Option A — GitHub Pages (Recommended)

### 1) Create a GitHub repository

- Go to GitHub and create a new public repository (example: `studyspark-blog`).

### 2) Upload this project

Use terminal in this folder:

```bash
git init
git add .
git commit -m "Initial StudySpark blog"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 3) Enable Pages in GitHub

- Open your repo on GitHub.
- Go to **Settings → Pages**.
- In **Build and deployment**, choose **GitHub Actions**.

### 4) Wait for deployment

- Go to **Actions** tab and wait for workflow **Deploy StudySpark to GitHub Pages** to finish.
- Your site URL will be:
  - `https://<your-username>.github.io/<repo-name>/`

## Important note for project links

Because this project uses relative links, it works on GitHub Pages as-is.

## Option B — Netlify (No Git required)

- Go to Netlify Drop: https://app.netlify.com/drop
- Drag and drop the entire project folder.
- Site is deployed instantly with a free URL.

## Option C — Cloudflare Pages (Free)

- Create a Cloudflare Pages project.
- Connect your GitHub repo.
- Build command: *(leave empty)*
- Output directory: `.`
- Deploy.

## After deployment checklist

- Open homepage and all 4 sample post links
- Verify worksheet downloads work
- Verify search/filter and quiz interactions
- Verify mobile layout in browser dev tools
