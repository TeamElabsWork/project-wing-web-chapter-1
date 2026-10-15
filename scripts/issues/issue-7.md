### 🎯 User Story
As a registered photographer, I want to upload my photographs with a title and optional description through a simple drag-and-drop interface, see a live preview, and have the image securely stored and published, so that my work appears instantly in the public gallery.

---

### 📖 Context & Scope
The upload pipeline is the core content-creation funnel of the platform. It requires rigorous file validation (image format check, file size limit) on both client and server, streaming the image to Cloudinary storage, extracting EXIF data via the Python intelligence service, and persisting the resulting metadata in MongoDB.

---

### 🛠️ Technical Implementation Guide

#### 1. Upload Form UI (`app/upload/page.tsx`)
- Guarded page (requires user authentication; redirect to `/login` if unauthenticated).
- Interactive drag-and-drop zone with file picker fallback:
  - Supported types: JPEG, PNG, WebP.
  - File size limit: Max 10MB.
  - Live client-side preview image immediately upon file selection.
  - Ability to clear and replace the selected file.
- Metadata inputs:
  - `Title`: Required, character counter (max 120 chars).
  - `Description`: Optional textarea (max 1000 chars).
  - Note linking to the Community Guidelines ("Only upload your original work").
- Progress / Loading state during upload submission (disabled submit button, spinner/progress indicator).

#### 2. Backend Upload Route (`app/api/photos/upload/route.ts`)
- **`POST /api/photos/upload`**:
  - Verify session via `auth()`. Return `401 Unauthorized` if not logged in.
  - Parse `multipart/form-data` payload containing file, title, and description.
  - **Server-side Validation**:
    - Reject non-image MIME types (accept only `image/jpeg`, `image/png`, `image/webp`).
    - Enforce 10MB byte size limit. Return `400 Bad Request` if invalid.
  - Stream image buffer to Cloudinary using `uploadImageToCloudinary()` from `@/lib/cloudinary`.
  - *(Optional integration)*: Call Python FastAPI service (`IMAGE_SERVICE_URL/api/v1/analyze-image`) to extract EXIF data.
  - Save `Photograph` record in MongoDB referencing `session.user.id` as `owner`.
  - Return `201 Created` with the newly created photograph document.

#### 3. Success Redirect
- On upload completion, display a success toast and redirect user to `/photos/[newId]`.

---

### ⚠️ Edge Cases & Security
- **MIME Sniffing Prevention**: Verify file signature / MIME type on the server, not just client filename extensions.
- **Fail-safe Storage**: If MongoDB insertion fails after Cloudinary upload succeeds, delete the uploaded file from Cloudinary to prevent orphaned assets.
- **Payload Limits**: Ensure Next.js route handler config permits multipart payloads up to 10MB.

---

### ✅ Definition of Done (DoD)
- [ ] Drag-and-drop file upload UI with instant image preview.
- [ ] Non-image files and files > 10MB are rejected with user-friendly error messages.
- [ ] Successful uploads store the image in Cloudinary and save metadata in MongoDB.
- [ ] Unauthenticated users are prevented from accessing `/upload` or posting to the API.
- [ ] Creator is redirected to the published photo detail view upon success.
