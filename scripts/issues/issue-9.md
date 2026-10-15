### 🎯 User Story
As a student or visitor, I want to browse all published photographs in a fast, responsive gallery sorted newest-first, and easily paginate or load more photos, so that I can discover new creative work without slow loading times.

---

### 📖 Context & Scope
The public gallery is the face of the platform. It must load almost instantaneously using Next.js Server Components, render images with optimal responsive dimensions via `next/image`, display graceful skeleton loading states, provide an empty state when no photos exist, and support smooth pagination or "Load More" controls.

---

### 🛠️ Technical Implementation Guide

#### 1. Public Gallery Page (`app/page.tsx` & `app/gallery/page.tsx`)
- Implement homepage using Next.js Server Components.
- Query initial photo set from MongoDB:
  - Sorted by `createdAt: -1` (newest first).
  - Page size: 12 photos per batch.
  - Populate photographer details (`name`, `profileImageUrl`, `_id`).
- Connect to `GET /api/photos?page=1&limit=12` for client-side pagination / "Load More" fetching.

#### 2. Responsive Grid & Card Layout
- Grid CSS architecture:
  - Mobile (320px–639px): 1 column.
  - Tablet (640px–1023px): 2 columns.
  - Desktop (1024px+): 3 to 4 columns.
- Integrate the `<PhotoCard />` component from `@/components/gallery/PhotoCard`.
- Leverage Next.js `<Image />` optimization:
  - `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
  - Proper aspect ratio preservation (`aspect-[4/3]` or natural masonry).
  - Blur placeholder while fetching.

#### 3. Core UI States
- **Loading State**: Render an animated skeleton grid (`components/gallery/PhotoCardSkeleton.tsx`) while awaiting data.
- **Empty State**: When 0 photographs exist, render a friendly empty state illustration with an action button encouraging creators to publish the first photo.
- **Pagination / Load More**:
  - Implement a clean "Load More Photographs" button or pagination bar at the bottom of the grid.
  - Show a small spinner while appending the next page of results.
  - Disable or hide button when all photos have been loaded (`hasMore === false`).

---

### ⚠️ Edge Cases & Performance
- **Image Performance**: Ensure images are not loaded in oversized raw formats; `next/image` should serve optimized WebP/AVIF to browser clients.
- **Cumulative Layout Shift (CLS)**: Always provide explicit aspect ratios or width/height containers to prevent layout shift as images load.

---

### ✅ Definition of Done (DoD)
- [ ] Gallery loads quickly and renders newest photographs first.
- [ ] Responsive layout adapts smoothly from mobile (1 col) to desktop (3-4 cols).
- [ ] Skeleton cards render during initial loading states.
- [ ] Empty state appears gracefully when no photos are found.
- [ ] "Load More" pagination successfully fetches and appends subsequent batches without duplicates.
