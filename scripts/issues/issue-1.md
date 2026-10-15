### 🎯 User Story
As a registered photographer, I want to edit the title and description of my uploaded photographs, or delete them if I no longer wish to showcase them, so that I maintain complete control over my portfolio.

---

### 📖 Context & Scope
The platform allows students to upload photos, but creators must be able to update typos or permanently remove photos. Deletions must be clean and cascading: removing both the MongoDB database record AND permanently deleting the image file from Cloudinary storage using its `imagePublicId`. Non-owners must never be permitted to edit or delete another user's work.

---

### 🛠️ Technical Implementation Guide

#### 1. API Route Handlers (`app/api/photos/[id]/route.ts`)
- **`PATCH /api/photos/[id]`**:
  - Check authenticated session using `auth()`. Return `401 Unauthorized` if not logged in.
  - Fetch photograph by ID. Verify `photo.owner.toString() === session.user.id`. Return `403 Forbidden` if user is not the owner.
  - Validate updated fields: `title` (required, max 120 chars) and `description` (optional, max 1000 chars).
  - Update document in MongoDB and return updated photo object.
- **`DELETE /api/photos/[id]`**:
  - Check authenticated session.
  - Verify ownership (`photo.owner === session.user.id`) OR check if `session.user.role === 'admin'`.
  - Call Cloudinary destroy utility: `deleteImageFromCloudinary(photo.imagePublicId)` from `@/lib/cloudinary`.
  - Delete document from MongoDB: `await Photograph.findByIdAndDelete(id)`.
  - Return `{ success: true, message: 'Photograph deleted successfully' }`.

#### 2. Frontend Components
- On `PhotoCard` and `/photos/[id]` detail view:
  - Check if `session.user?.id === photo.ownerId`.
  - If owner, render an "Actions" dropdown menu (three dots icon) with **Edit** and **Delete** options.
  - **Edit Modal**: Form pre-populated with current title and description. Submits via `fetch('/api/photos/' + id, { method: 'PATCH' })`.
  - **Delete Confirmation Modal**: Alert dialog requiring confirmation ("Are you sure you want to permanently delete this photo? This action cannot be undone.").

---

### ⚠️ Edge Cases & Security
- **Unauthorized mutation**: Ensure server-side checks verify ownership before touching the database or Cloudinary. Never rely solely on hiding the UI buttons.
- **Orphaned files prevention**: If Cloudinary deletion fails, handle the error gracefully without leaving the system in an inconsistent state.
- **Optimistic UI / Cache revalidation**: Revalidate Next.js cache using `router.refresh()` or Next.js revalidation tag after edit/delete.

---

### ✅ Definition of Done (DoD)
- [ ] Only the photo owner (or admin) sees the Edit and Delete options in the UI.
- [ ] Attempting to `PATCH` or `DELETE` as another user returns `403 Forbidden`.
- [ ] Editing updates the title/description and immediately reflects in the UI.
- [ ] Deleting permanently purges the asset from Cloudinary storage AND deletes the MongoDB document.
- [ ] Deletion requires user confirmation in a modal before execution.
