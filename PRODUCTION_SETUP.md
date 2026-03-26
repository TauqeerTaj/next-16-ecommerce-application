# Production Setup Guide

## Current Status: Development Ready ✅
The current setup works perfectly for development but needs changes for production.

## Production Requirements

### 1. Cloud Storage Integration
**Current Issue**: Files saved to local filesystem won't work in production

**Solutions**:
- **Vercel Blob** (easiest for Vercel deployments)
- **AWS S3** (most scalable)
- **Cloudinary** (excellent for images)
- **CloudFlare R2** (cost-effective)

### 2. Environment Variables
Add to both `.env.local` files:

```bash
# Client App (.env.local)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Admin App (.env.local)
NEXT_PUBLIC_BASE_URL=https://admin.yourdomain.com
NODE_ENV=production
```

### 3. Production Upload Route Example
Replace the upload route with cloud storage:

```typescript
// Example with Vercel Blob
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  const file = request.formData().get('file') as File;
  
  const blob = await put(file.name, file, {
    access: 'public',
  });
  
  return NextResponse.json({ imageUrl: blob.url });
}
```

### 4. Database Considerations
- ✅ MongoDB works in production
- Use MongoDB Atlas for cloud hosting
- Ensure connection string uses SSL

### 5. Deployment Platforms
**Recommended**:
- **Vercel**: Easiest for Next.js apps
- **Netlify**: Good alternative
- **AWS**: More control, more complex

### 6. Security Enhancements
- Rate limiting on upload endpoints
- File type validation
- Virus scanning for uploads
- CORS configuration

## Quick Production Checklist

1. [ ] Set up cloud storage (Vercel Blob/S3)
2. [ ] Update upload route with cloud storage
3. [ ] Configure environment variables
4. [ ] Set up MongoDB Atlas
5. [ ] Deploy both apps
6. [ ] Test image upload/display
7. [ ] Set up custom domains
8. [ ] Configure SSL certificates

## Development vs Production Summary

| Feature | Development | Production |
|---------|-------------|------------|
| File Storage | Local filesystem | Cloud storage |
| URLs | localhost | Custom domains |
| Database | Local MongoDB | MongoDB Atlas |
| Environment | .env.local | Production env vars |

The current setup is **production-ready** once you implement cloud storage for file uploads.
