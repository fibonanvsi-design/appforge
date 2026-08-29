#!/bin/bash

# AppForge - Quick Setup for GitHub Push
# =======================================

echo "🚀 AppForge - GitHub Push Helper"
echo "================================="
echo ""
echo "⏳ Waiting for your GitHub credentials..."
echo ""
echo "Please provide:"
echo ""
echo "1️⃣  GitHub Username"
echo "2️⃣  GitHub Personal Access Token"
echo ""
echo "📝 How to get your token:"
echo "   → Go to: https://github.com/settings/tokens"
echo "   → Click: Generate new token (classic)"
echo "   → Select scope: 'repo' (full control)"
echo "   → Copy the token"
echo ""
echo "---"
echo ""

# Read username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Read token (hidden input)
read -sp "Enter your GitHub token: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token cannot be empty"
    exit 1
fi

REPO_NAME="appforge"

echo ""
echo "📋 Configuration:"
echo "   Username: $GITHUB_USERNAME"
echo "   Repository: $REPO_NAME"
echo ""
echo "⚠️  Make sure you've created the repository at:"
echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
read -p "Repository created? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo ""
    echo "Please create the repository first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Don't initialize with README"
    echo "4. Click Create repository"
    echo ""
    echo "Then run this script again."
    exit 0
fi

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add remote with token
echo ""
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
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "📦 Repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🚀 NEXT STEPS - Deploy to Vercel:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Open: https://vercel.com/new"
    echo ""
    echo "2. Import your repository:"
    echo "   → Select: ${GITHUB_USERNAME}/${REPO_NAME}"
    echo ""
    echo "3. Set Environment Variables:"
    echo "   DATABASE_URL=your_postgresql_connection"
    echo "   NEXTAUTH_SECRET=generate_random_32_chars"
    echo "   NEXTAUTH_URL=https://your-app.vercel.app"
    echo ""
    echo "4. Click Deploy!"
    echo ""
    echo "5. After deployment, run migration:"
    echo "   vercel env pull .env"
    echo "   npx prisma migrate deploy"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📚 Full deployment guide: DEPLOYMENT.md"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Possible issues:"
    echo "  • Repository doesn't exist on GitHub"
    echo "  • Token doesn't have 'repo' scope"
    echo "  • Username is incorrect"
    echo ""
    echo "Please check and try again."
    exit 1
fi
