# Vera Gayrimenkul Website

Modern, responsive website for Vera Real Estate built with Next.js 14.

## 🚀 Features

- **Property Listings** - Complete property management system
- **Team Management** - Admin panel for team members
- **Career Applications** - Job application system
- **Secure Admin Panel** - JWT authentication with middleware protection
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags and structured data

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** JWT with HTTP-only cookies
- **Security:** Custom middleware, security headers
- **Deployment:** PM2, Docker support

## 📦 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🚀 Deployment

### Option 1: PM2 (Recommended)
```bash
# Copy files to server
scp -r . user@server:/path/to/app

# Run deployment script
./deploy.sh
```

### Option 2: Docker
```bash
# Build image
docker build -t vera-gayrimenkul .

# Run container
docker run -p 3000:3000 vera-gayrimenkul
```

### Server Requirements
- Node.js 18+
- PM2 (for process management)
- nginx (for reverse proxy)

## 🔐 Admin Panel

**URL:** `/admin/login`
**Email:** `admin@veragrup.com`
**Password:** `admin123`

### Admin Features
- Team management
- Career applications
- Property listings
- Secure authentication

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel
│   │   ├── api/             # API routes
│   │   ├── ilanlar/         # Property listings
│   │   └── components/      # Shared components
│   └── middleware.ts        # Route protection
├── public/
│   └── uploads/             # File uploads
└── deploy.sh               # Deployment script
```

## 🛡️ Security Features

- JWT authentication
- HTTP-only cookies
- Route middleware protection
- Security headers
- Input validation
- CSRF protection

## 🌐 Environment Variables

Create `.env.local`:
```env
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 📝 Deployment Checklist

- [ ] Update JWT_SECRET in production
- [ ] Configure nginx reverse proxy
- [ ] Set up SSL certificate
- [ ] Configure firewall
- [ ] Set up monitoring
- [ ] Configure backups

## 🔧 nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📞 Support

For technical support or questions, contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** 2024 