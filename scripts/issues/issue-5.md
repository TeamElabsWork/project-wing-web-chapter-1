### 🎯 User Story
As a platform administrator, I want to review uploaded photographs and have the authority to remove any photo or account that violates community guidelines or copyright policies, so that the platform remains safe, respectful, and legally compliant.

---

### 📖 Context & Scope
Because registration and publishing are open to all students, the platform requires moderation authority. Only designated users with `role: 'admin'` are permitted to execute moderation overrides. Admins must be able to delete any violating photograph or ban an infringing user account.

---

### 🛠️ Technical Implementation Guide

#### 1. Admin Role & Seeder Script (`scripts/seed-admin.ts`)
- Build a script to seed or promote a user to `role: 'admin'`:
  - Run via: `npx tsx scripts/seed-admin.ts admin@kiit.ac.in`.
  - Searches MongoDB for the user with the specified email and updates their role to `'admin'`.
  - If the user doesn't exist, create an initial admin account with a secure default password.

#### 2. Moderation API Endpoints
- **`DELETE /api/photos/[id]` (Admin Override)**:
  - Check `session.user.role === 'admin'`.
  - Admins can delete ANY photograph regardless of who owns it.
  - Automatically destroys the file in Cloudinary using `deleteImageFromCloudinary(photo.imagePublicId)` and deletes the MongoDB document.
- **`DELETE /api/admin/users/[id]` (Account Ban/Purge)**:
  - Check `session.user.role === 'admin'`.
  - Find all photographs owned by the user.
  - Purge all photo files in Cloudinary and delete their documents in MongoDB.
  - Delete the user account from `users` collection.

#### 3. Frontend Admin Controls
- In `PhotoCard` and `/photos/[id]` detail view:
  - If `session.user?.role === 'admin'`, display an "Admin Moderation" badge and red "Remove Content" button.
  - Prompt for confirmation modal ("Moderation Action: Delete this photograph for policy violation?").
  - On confirm, trigger delete and display a toast confirmation.

---

### ⚠️ Edge Cases & Security
- **Role Verification**: Verify `session.user.role === 'admin'` strictly server-side on every admin API call. Never trust client-side claims.
- **Self-Admin Protection**: Prevent admins from accidentally deleting their own admin status.

---

### ✅ Definition of Done (DoD)
- [ ] Admin seed script exists and successfully promotes an email to `role: 'admin'`.
- [ ] Non-admin users cannot trigger moderation endpoints (returns `403 Forbidden`).
- [ ] Admin users see moderation delete controls on all photos across the platform.
- [ ] Admin deletion permanently removes assets from Cloudinary and documents from MongoDB.
- [ ] Account ban endpoint removes both the user and all their uploaded photos.
