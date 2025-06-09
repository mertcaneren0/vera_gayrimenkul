#!/bin/bash

# Vera Gayrimenkul Deployment Script
echo "🚀 Starting Vera Gayrimenkul deployment..."

# Stop existing process
echo "⏹️ Stopping existing application..."
pm2 stop vera-gayrimenkul || true
pm2 delete vera-gayrimenkul || true

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production=false

# Build application
echo "🔨 Building application..."
npm run build

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p public/uploads/team

# Set permissions
echo "🔐 Setting permissions..."
chmod 755 public/uploads
chmod 755 public/uploads/team

# Start with PM2
echo "🌟 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 process list and startup script
echo "💾 Saving PM2 configuration..."
pm2 save
pm2 startup

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running on port 3000"
echo "🔧 Admin panel: http://your-domain.com/admin/login"
echo "📧 Admin email: admin@veragrup.com"
echo "🔑 Admin password: admin123"

# Show status
pm2 status 