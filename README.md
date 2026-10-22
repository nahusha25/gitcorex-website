# gitCoreX — Modern Website Development & Enterprise ERP Solutions

Official production-ready static website for **gitCoreX** (Bengaluru, Karnataka, India), hosted on **GitHub Pages** with custom domain [https://www.gitcorex.in](https://www.gitcorex.in).

---

## Company Profile & Credentials

- **Company Name:** gitCoreX
- **GSTIN:** 29FBAPR5805L1Z5
- **Official Email:** gitcorex26@gmail.com
- **Contact Phone:** +91 9900020043
- **Headquarters:** Bengaluru, Karnataka, India
- **Primary Domain:** [https://www.gitcorex.in](https://www.gitcorex.in)
- **WhatsApp Support:** [+91 9900020043](https://wa.me/919900020043)
- **Core Offerings:** Modern Website Development, Enterprise ERP Solutions, and Digital Engineering.

---

## Tech Stack & Architecture

- **Hosting Platform:** GitHub Pages (Static Site, Zero PHP, Zero Server Dependencies)
- **Custom Domain:** `www.gitcorex.in` (configured via root `CNAME` and `.nojekyll`)
- **Frontend Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Form Handling:** Web3Forms API (`https://api.web3forms.com/submit`) via client-side `fetch`
- **Typography:** Self-hosted Google Fonts (Inter & Poppins in WOFF2 format, zero external font requests)
- **SEO & Performance:** Full OpenGraph & Twitter Cards, LocalBusiness JSON-LD schema, `sitemap.xml`, `robots.txt`, WebP imagery, preloaded critical assets.

---

## Local Development & Preview

Since the site is 100% static, you can preview it locally using Python's built-in HTTP server:

```bash
# Start local HTTP static server on port 8000
python -m http.server 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

---

## GitHub Pages Deployment

1. **Repository Settings**:
   - Repository: `https://github.com/nahusha25/gitcorex-website.git`
   - Branch: `main`
   - Folder: `/ (root)`
2. **Custom Domain**:
   - A `CNAME` file in the repository root contains `www.gitcorex.in`.
   - `.nojekyll` in the repository root prevents Jekyll from ignoring asset directories.
   - In GitHub repository settings -> **Pages** -> **Custom domain**: enter `www.gitcorex.in` and check **Enforce HTTPS**.
3. **DNS Configuration**:
   - Point the `www` CNAME record in your domain DNS to `<username>.github.io`.
   - Point apex A records (`@`) to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

## Form Processing (Web3Forms)

Form submissions are processed serverlessly by **Web3Forms** and delivered directly to `gitcorex26@gmail.com`:

1. **Access Key Configuration:**
   The access key is defined in one clearly marked location at the top of [`js/main.js`](js/main.js):
   ```javascript
   const WEB3FORMS_ACCESS_KEY = '20b5c5ff-f10b-4dbb-bbac-a89dfaa452df';
   ```
2. **Contact & Consultation Form ([`contact.html`](contact.html)):**
   - Submits client name, 10-digit phone, email, service interest, budget range, timeline, and message.
   - Subject: `gitCoreX Website Inquiry: [Service] - [Name]`
   - Includes honeypot (`botcheck`) spam filter and client-side validation.
   - Shows inline success notification upon submission (no page redirect).
   - Shows inline error fallback with direct phone (`+91 9900020043`) and email (`gitcorex26@gmail.com`).
3. **Careers Application Form ([`careers.html`](careers.html)):**
   - Submits candidate name, 10-digit phone, email, applied position, experience in years, and technical summary.
   - Subject: `gitCoreX Career Application: [Role] - [Name]`
   - **Resume Submission:** Applicants are directed to email their resume directly to `gitcorex26@gmail.com` using a dynamic `mailto:` link that automatically populates the applied position in the email subject line.

---

## Directory Structure

```
.
├── .gitignore             # Git ignore file for static project
├── .nojekyll              # Disables Jekyll processing on GitHub Pages
├── CNAME                  # Custom domain (www.gitcorex.in)
├── 404.html               # Custom branded 404 error page
├── about.html             # Corporate story, mission, and engineering values
├── careers.html           # Technical careers form & email resume workflow
├── contact.html           # Free consultation inquiry form
├── erp.html               # Enterprise ERP modular solutions & architecture
├── index.html             # High-converting homepage & neutral SaaS UI mockups
├── privacy.html           # Comprehensive privacy policy & data collection limits
├── services.html          # Web development, digital apps, & engineering services
├── terms.html             # Terms of service and intellectual property provisions
├── robots.txt             # Search engine crawler instructions & sitemap link
├── sitemap.xml            # Production XML sitemap for https://www.gitcorex.in
├── css/
│   ├── style.css          # Design system, 8px grid, responsive rules
│   └── style.min.css      # Production-minified stylesheet
├── fonts/                 # Self-hosted Inter & Poppins WOFF2 font files
│   └── fonts.css          # Local @font-face declarations
├── images/                # Optimized WebP and PNG logos, badges, and favicons
└── js/
    └── main.js            # Menu drawer, FAQ accordion, scroll-reveal, & Web3Forms
```

---

## License

Copyright &copy; gitCoreX. All Rights Reserved.
