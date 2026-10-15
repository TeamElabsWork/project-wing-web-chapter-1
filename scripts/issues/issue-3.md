### 🎯 User Story
As an art admirer or student photographer, I want to click into any photograph from the gallery to view it in full resolution, read its description, inspect camera/lens settings, and view the photographer's bio, so that I can appreciate the artwork and learn from their technique.

---

### 📖 Context & Scope
The photo detail page is the primary showcase view for individual artwork. It must support high-resolution image rendering without distorting aspect ratios, provide a lightbox view for fullscreen viewing, display camera shooting specifications (EXIF), and link to the photographer's personal profile.

---

### 🛠️ Technical Implementation Guide

#### 1. Dynamic Route Page (`app/photos/[id]/page.tsx`)
- Server Component that reads `params.id`.
- Connect to database and query photograph: `await Photograph.findById(id).populate('owner', 'name profileImageUrl bio').lean()`.
- If photograph is not found, trigger Next.js `notFound()` to render `app/not-found.tsx`.

#### 2. Layout & UI Components
- **Main Image Stage**:
  - High-res image display with responsive max dimensions (`max-h-[80vh]`).
  - Subtle blur-up placeholder while loading (`placeholder="blur"`).
  - Click-to-expand / Lightbox modal allowing fullscreen inspect.
- **Photo Metadata Sidebar / Card**:
  - Photo `title` in bold display typography.
  - Formatted `createdAt` date (e.g., "Published on October 15, 2026").
  - Description body text (supporting multi-paragraph line breaks).
- **Photographer Attribution Card**:
  - Avatar image (fallback to initials icon).
  - Photographer's name linking to `/users/[ownerId]`.
  - Short bio preview with a "View Full Profile" button.
- **Camera EXIF Badge Grid**:
  - If `photo.exifData` exists, render camera details:
    - 📷 Camera: `make` + `model`
    - 🔭 Lens: `lens`
    - ⚙️ Settings: `focalLength`, `aperture` (f/stop), `exposureTime` (shutter speed), `ISO`.

#### 3. Back Navigation & Responsiveness
- Add a breadcrumb or "← Back to Gallery" button that preserves browse context.
- Mobile view: Stack image vertically on top, with details and attribution card below.

---

### ⚠️ Edge Cases & Security
- **Invalid MongoDB ID format**: Catch non-ObjectId strings gracefully without 500 server crashes.
- **Deleted User attribution**: If the photograph's owner was deleted, display a fallback "Unknown Artist" rather than crashing.

---

### ✅ Definition of Done (DoD)
- [ ] Valid photo IDs render large photo, title, description, and photographer card.
- [ ] Invalid or non-existent photo IDs return a clean 404 Not Found page.
- [ ] Camera EXIF specs (shutter, aperture, ISO) render cleanly when present.
- [ ] Responsive across mobile, tablet, and widescreen viewports.
- [ ] Photographer card links directly to the creator's portfolio page.
