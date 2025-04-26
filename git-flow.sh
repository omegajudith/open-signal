# #!/bin/bash

# # Exit on any error
# set -e

# echo "📦 Git DevOps Local Deploy Automation"

# # Prompt for feature branch
# read -p "🔧 Feature branch name (e.g. feature/mobile-view): " feature_branch

# # Prompt for commit message
# read -p "💬 Commit message: " commit_msg

# # Stash any local changes
# echo "🗃️ Stashing current changes..."
# git stash

# # Switch to the feature branch
# echo "🌿 Switching to $feature_branch..."
# git checkout "$feature_branch"

# # Apply stashed changes
# echo "🔄 Applying stashed changes..."
# git stash pop || true

# # Commit the changes
# echo "✅ Committing changes..."
# git add .
# git commit -m "$commit_msg"

# # Merge into dev
# echo "📥 Merging $feature_branch into dev..."
# git checkout dev
# git merge "$feature_branch"

# # Merge dev into main
# echo "🚀 Merging dev into main..."
# git checkout main
# git merge dev

# # Push main to GitHub
# echo "📤 Pushing main to GitHub..."
# git push origin main

# # Deploy to Vercel
# echo "⚙️ Deploying to Vercel..."
# vercel --prod --token=$VERCEL_TOKEN_OPENSIGNAL --confirm

# # Notify
# echo "✅ Deployed to https://open-signal.vercel.app"
# notify-send "Vercel Deploy" "✅ OpenSignal deployed successfully!"

# # Go back to dev
# git checkout dev
#!/bin/bash

# Exit on any error
set -e

echo "📦 Git DevOps Local Deploy Automation"

# Prompt for feature branch
read -p "🔧 Feature branch name (e.g. feature/mobile-view): " feature_branch

# Prompt for commit message
read -p "💬 Commit message: " commit_msg

# Stash local changes if any
echo "🗃️ Stashing current changes (if any)..."
git stash --include-untracked

# Checkout feature branch
echo "🌿 Switching to $feature_branch..."
git checkout "$feature_branch"

# Apply stashed changes back
echo "🔄 Applying stashed changes..."
git stash pop || true

# Check for changes before trying to commit
if ! git diff --cached --quiet || ! git diff --quiet; then
  echo "✅ Committing changes..."
  git add .
  git commit -m "$commit_msg"
else
  echo "⚠️ No changes to commit"
fi

# Merge feature branch into dev
echo "📥 Merging $feature_branch into dev..."
git checkout dev
git merge "$feature_branch"

# Merge dev into main
echo "🚀 Merging dev into main..."
git checkout main
git merge dev

# Push to GitHub
echo "📤 Pushing main to GitHub..."
git push origin main

# Deploy to Vercel
echo "⚙️ Deploying to Vercel..."
vercel --prod --token=$VERCEL_TOKEN_OPENSIGNAL --confirm

# Final message
echo "✅ Deployed to https://open-signal.vercel.app"
notify-send "Vercel Deploy" "✅ OpenSignal deployed successfully!"

# Return to dev branch
git checkout dev

# Optional: Ask if you want to delete the feature branch
read -p "🧹 Delete $feature_branch locally? (y/n): " delete_branch
if [[ "$delete_branch" == "y" ]]; then
  git branch -d "$feature_branch"
  echo "🧼 Deleted $feature_branch"
fi
