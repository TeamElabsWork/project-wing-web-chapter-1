### 🎯 User Story
As a photographer, I want a dedicated public profile page that collects all my uploaded photographs, shows my bio, and allows me to update my profile details (name, bio, profile image), so that I can share my personal photography portfolio link with peers.

---

### 📖 Context & Scope
Every registered creator gets their own public URL at `/users/[id]`. Anyone can browse a photographer's collection. When the logged-in user visits their own profile (or `/users/me`), they must have an "Edit Profile" option to customize their bio, display name, and profile picture.

---

### 🛠️ Technical Implementation Guide

#### 1. Public Portfolio View (`app/users/[id]/page.tsx`)
- Query user document: `await User.findById(id).select('-passwordHash').lean()`.
- Query all photographs by user: `await Photograph.find({ owner: id }).sort({ createdAt: -1 }).lean()`.
- Profile Header section:
  - Large avatar / profile image (with default fallback).
  - Photographer's name, join date, and bio text.
  - Quick stat: Total photographs published (e.g. "14 Photographs").
- Portfolio Gallery Grid:
  - Render the user's photos using the reusable `<PhotoCard />` component.
  - Empty state: If user has 0 photos, render "This photographer hasn't published any work yet."

#### 2. Profile Editing API (`app/api/users/[id]/route.ts`)
- **`PATCH /api/users/[id]`**:
  - Verify authenticated session. Return `401 Unauthorized` if not signed in.
  - Check permission: `session.user.id === id`. Return `403 Forbidden` if attempting to modify someone else's profile.
  - Validate input payload:
    - `name`: String, 2–60 characters.
    - `bio`: String, max 300 characters.
    - `profileImageUrl`: String (valid URL or Cloudinary avatar).
  - Update user document in MongoDB and return updated user object.

#### 3. Edit Profile Modal Component
- "Edit Profile" button visible only when viewing one's own profile.
- Modal dialog with inputs for Name and Bio (character counter: X/300).
- Instant UI refresh on save with a success toast notification.

---

### ⚠️ Edge Cases & Security
- **Strict Authorization**: Non-owners must NEVER be able to edit another user's bio or profile photo.
- **XSS Prevention**: Sanitize all text input before persisting to database.

---

### ✅ Definition of Done (DoD)
- [ ] Public profile displays user avatar, name, bio, and grid of uploaded photos.
- [ ] Non-existent user IDs return a 404 page.
- [ ] Account owners can edit their bio and display name.
- [ ] Attempting to edit another user's profile via API returns `403 Forbidden`.
- [ ] Bio character count is constrained to max 300 characters.
