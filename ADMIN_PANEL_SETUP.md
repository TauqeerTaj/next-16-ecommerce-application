# Admin Panel Setup Guide

## Create New Admin Application

```bash
# Navigate to parent directory
cd ..

# Create new Next.js admin app
npx create-next-app@latest e-commerce-admin --typescript --tailwind --eslint --app

# Navigate to admin app
cd e-commerce-admin
```

## Admin Panel Features to Implement

### 1. Environment Variables (.env.local)

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001
```

### 2. Banner Management API Routes

- `app/api/admin/banners/route.ts` - GET/POST banners
- `app/api/admin/banners/[id]/route.ts` - PUT/DELETE banners
- `app/api/admin/upload/route.ts` - Image upload endpoint

### 3. Admin Components to Create

- `components/admin/BannerManager.tsx` - List and manage banners
- `components/admin/BannerForm.tsx` - Add/edit banner form
- `components/admin/ImageUpload.tsx` - File upload component

### 4. Admin Pages

- `app/admin/page.tsx` - Admin dashboard
- `app/admin/banners/page.tsx` - Banner management
- `app/admin/login/page.tsx` - Admin login

### 5. Key Dependencies to Install

```bash
npm install next-auth mongodb multer @types/multer
```

## Database Schema for Banners

```javascript
// banners collection
{
  _id: ObjectId,
  title: String,
  imageUrl: String,
  order: Number,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Integration Steps

1. **Set up admin app** with authentication
2. **Create banner management UI** with CRUD operations
3. **Implement image upload** functionality
4. **Connect to same database** as main app
5. **Test banner updates** reflect in main app

## Security Considerations

- Admin authentication with NextAuth
- File upload validation (size, type)
- API route protection
- CORS configuration for cross-origin requests
