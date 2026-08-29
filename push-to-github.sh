#!/bin/bash

# AppForge GitHub Push Script
# ============================

echo "🚀 AppForge - GitHub Push Setup"
echo "================================"
echo ""

# Check if token is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub token tidak ditemukan"
    echo ""
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_TOKEN YOUR_USERNAME"
    echo ""
    echo "Contoh:"
    echo "  ./push-to-github.sh ghp_xxxxxxxxxxxx johndoe"
    echo ""
    exit 1
fi

if [ -z "$2" ]; then
    echo "❌ Error: GitHub username tidak ditemukan"
    echo ""
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_TOKEN YOUR_USERNAME"
    echo ""
    exit 1
fi

GITHUB_TOKEN=$1
GITHUB_USERNAME=$2
REPO_NAME="appforge"

echo "📋 Configuration:"
echo "   Username: $GITHUB_USERNAME"
echo "   Repository: $REPO_NAME"
echo ""

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add remote with token
echo "🔗 Adding GitHub remote..."
git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

if [ $? -ne 0 ]; then
    echo "❌ Failed to add remote"
    exit 1
fi

echo "✅ Remote added successfully"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push successful!"
    echo ""
    echo "🎉 Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    echo ""
    echo "Next steps:"
    echo "1. ✅ Code pushed to GitHub"
    echo "2. 🚀 Deploy to Vercel: https://vercel.com/new"
    echo "3. 🗄️  Setup Database (Supabase/Neon)"
    echo "4. ⚙️  Set Environment Variables"
    echo "5. 🎯 Run: npx prisma migrate deploy"
    echo ""
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   - Repository exists on GitHub"
    echo "   - Token has correct permissions (repo scope)"
    echo "   - Username is correct"
    echo ""
    exit 1
fi
