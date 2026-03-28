# Vercel CI/CD Setup Guide

This guide explains how to set up automated deployment to Vercel for your e-commerce application.

## Overview

The CI/CD pipeline includes:
- **Automated testing** on pull requests and pushes
- **Preview deployments** for pull requests
- **Production deployments** from main branch
- **Environment variable management** through Vercel

## Prerequisites

1. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Connected to Vercel
3. **Vercel CLI**: Installed locally (optional)

## Step 1: Connect Your Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings
5. Click "Deploy"

## Step 2: Get Required IDs

After deployment, get these values from your Vercel project:

1. **Organization ID**: Go to Settings → General
2. **Project ID**: Go to Settings → General
3. **Access Token**: Go to Account Settings → Tokens → Create Token

## Step 3: Configure GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

### Required Secrets:
```
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
VERCEL_TOKEN=your-vercel-access-token
MONGODB_URI=mongodb://username:password@host:port/database
NEXTAUTH_SECRET=your-nextauth-secret
```

### Repository Variables (Settings > Variables):
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app/api/auth
PRODUCTION_DOMAIN=your-custom-domain.com (optional)
```

## Step 4: Environment Variables in Vercel

Also add these environment variables in your Vercel project dashboard:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the same variables as GitHub secrets
3. Add different values for different environments if needed

## Workflow Triggers

The pipeline triggers on:
- **Pull requests**: Creates preview deployments
- **Push to main**: Deploys to production
- **Push to develop**: Runs tests and creates preview

## Deployment Process

```
Code Push → Tests Run → Deploy to Vercel → Preview/Production URL
```

## Features

### Preview Deployments
- Automatic preview URLs for every PR
- Shareable links for testing
- Automatically cleaned up when PR is merged

### Production Deployments
- Automatic deployment from main branch
- Custom domain support
- HTTPS by default
- Global CDN

### Environment Management
- Separate environments for preview/production
- Automatic environment variable injection
- Secure secret management

## Monitoring

- **GitHub Actions**: Check deployment logs in Actions tab
- **Vercel Dashboard**: Monitor build status and performance
- **Analytics**: Built-in Vercel Analytics for performance metrics

## Custom Domains (Optional)

To use custom domains:

1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Configure DNS records
4. Add `PRODUCTION_DOMAIN` variable to GitHub

## Troubleshooting

### Build Failures
- Check environment variables in both GitHub and Vercel
- Verify all dependencies are in package.json
- Check build logs in GitHub Actions

### Environment Variable Issues
- Ensure variables are set in both GitHub secrets and Vercel
- Check variable names match exactly
- Verify NEXTAUTH_URL includes full path

### Deployment Not Triggering
- Check GitHub Actions permissions
- Verify webhook is set up correctly
- Check branch protection rules

## Best Practices

1. **Use preview deployments** for all features
2. **Test environment variables** locally first
3. **Keep secrets secure** - don't commit them
4. **Monitor build performance** regularly
5. **Use custom domains** for production

## Next Steps

1. Complete the setup steps above
2. Test with a pull request
3. Deploy to production by merging to main
4. Set up monitoring and alerts

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
