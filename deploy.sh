#!/bin/bash

echo "🚀 Deploying AppForge to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI found"
echo ""

# Check if logged in
echo "🔐 Checking Vercel authentication..."
vercel whoami

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ You need to login to Vercel first."
    echo "Run: vercel login"
    exit 1
fi

echo ""
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "Choose deployment type:"
echo "1) Preview deployment"
echo "2) Production deployment"
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" = "2" ]; then
    vercel --prod
else
    vercel
fi

echo ""
echo "✅ Deployment complete!"
