#!/bin/bash

# Vera Gayrimenkul - Safe Deployment Script
# Note: Configure server details in .env.local

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | xargs)
fi

# Check if required environment variables are set
if [ -z "$SERVER_IP" ] || [ -z "$SERVER_USER" ] || [ -z "$DOMAIN" ]; then
    echo "❌ Required environment variables missing!"
    echo "Please set SERVER_IP, SERVER_USER, and DOMAIN in .env.local"
    echo "Example:"
    echo "SERVER_IP=your.server.ip"
    echo "SERVER_USER=root"
    echo "DOMAIN=your-domain.com"
    exit 1
fi

echo "🚀 Starting deployment to $DOMAIN ($SERVER_IP)..."

# Build locally first
echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deployment."
    exit 1
fi

echo "✅ Build successful!"

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf vera-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.next \
    --exclude=*.log \
    --exclude=.env.local \
    .

# Upload to server
echo "📤 Uploading to server..."
scp vera-deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

# Deploy on server
echo "🚀 Deploying on server..."
ssh $SERVER_USER@$SERVER_IP << ENDSSH
# Stop existing PM2 processes
pm2 stop vera-gayrimenkul || true
pm2 delete vera-gayrimenkul || true

# Create application directory
mkdir -p /var/www/vera-gayrimenkul
cd /var/www/vera-gayrimenkul

# Extract files
tar -xzf /tmp/vera-deploy.tar.gz

# Install dependencies
npm install --production=false

# Build on server
npm run build

# Create necessary directories
mkdir -p logs
mkdir -p public/uploads/team

# Set permissions
chmod 755 public/uploads
chmod 755 public/uploads/team
chmod +x deploy.sh

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup

# Clean up
rm -f /tmp/vera-deploy.tar.gz

echo "✅ Application deployed successfully!"
echo "🌐 URL: http://$DOMAIN"
echo "🔧 Admin: http://$DOMAIN/admin/login"

ENDSSH

# Clean up local files
rm -f vera-deploy.tar.gz

echo ""
echo "🎉 DEPLOYMENT COMPLETED!"
echo "🌐 Website: http://$DOMAIN"
echo "🔧 Admin Panel: http://$DOMAIN/admin/login"
echo ""
echo "📊 Check status with: ssh $SERVER_USER@$SERVER_IP 'pm2 status'" 