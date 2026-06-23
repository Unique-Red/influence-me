# InfluenceMe - Influencer Marketing Homepage & Tools

A premium, fully responsive multi-page marketing platform for **InfluenceMe**, built using modern web development standards (HTML5, Vanilla CSS, and Javascript) and bundled with **Vite**.

## Pages In The Project
- **Home (`index.html`)**: Features hero animation, platform strips, dynamic scatter badges, brands section, service accordion, testimonials grid, and a dark themed footer.
- **Work (`work.html`)**: Grid showcase of brands that InfluenceMe has helped scale.
- **About (`about.html`)**: Features the story behind the founder, mission, and vision rows.
- **Contact Us (`contact.html`)**: consultation intake form with interactive success popup feedback.
- **Join as a Creator (`join.html`)**: Multi-section creator network registration form featuring:
  - Pre-styled brand-colored social handle input fields.
  - Interactive custom select dropdown fields for *Primary Niche* and *Total Audience Size*.
  - Dashed drag-and-drop media kit file upload box.
  - Character counter validation for pitches.
  - Interactive modal submit popup.

---

## Local Setup & Development

### 1. Install Dependencies
Run the command below to install Vite:
```bash
npm install
```

### 2. Run Local Development Server
Start the local server with hot reloading:
```bash
npm run dev
```
Open the local address (typically `http://localhost:5173`) in your browser to view and interact with the pages.

### 3. Build for Production
To bundle and optimize the project files into a static production folder (`dist/`):
```bash
npm run build
```

---

## Deployment Guide

We have pre-configured configurations for Vercel and Netlify in this repository.

### Option A: Deploy to Vercel (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your repository.
4. Vercel will automatically read the `vercel.json` settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. The site will be live on a production URL within seconds.

### Option B: Deploy to Netlify
1. Push this repository to your Git provider.
2. Sign in to [Netlify](https://www.netlify.com/) and choose **Import from Git**.
3. Import your repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click **Deploy Site**.

### Option C: Manual Static Upload
If you prefer not to use Git integrations, run `npm run build` locally and upload the generated `dist` folder directly to Netlify Drop or Vercel CLI.
