# 🚀 GitHub Pages Deployment Guide for ClueSense

## Quick Setup Steps:

### 1. Create GitHub Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit with Apple-style design"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/ClueSense.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. Set Up Custom Domain (Optional)
1. In the **Pages** settings, add your custom domain
2. Update the `public/CNAME` file with your domain:
   ```
   yourdomain.com
   ```
3. Configure your domain's DNS:
   - **For apex domain (yourdomain.com):**
     - Add A records pointing to:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
   
   - **For subdomain (www.yourdomain.com):**
     - Add CNAME record pointing to: `YOUR_USERNAME.github.io`

### 4. Deploy
Your site will automatically deploy when you push to the `main` branch!

## 🌐 Your site will be available at:
- **GitHub Pages URL:** `https://YOUR_USERNAME.github.io/ClueSense/`
- **Custom Domain:** `https://yourdomain.com` (after DNS setup)

## 🛠️ Local Development
```bash
npm run dev
```

## 🏗️ Build for Production
```bash
npm run build:client
```

## 📝 Notes:
- The site is configured for client-side only (no server components for GitHub Pages)
- All Apple-style typography and design is preserved
- Automatic deployments on every push to main branch
- HTTPS is automatically enabled by GitHub Pages

## 🎨 Features Included:
✅ Apple San Francisco font system
✅ Apple-style typography hierarchy  
✅ Responsive design
✅ Modern animations and transitions
✅ Button visibility fixes
✅ Professional UI components
