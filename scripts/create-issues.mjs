import { execSync } from 'child_process';

const REPO = 'TeamElabsWork/project-wing-web-chapter-1';

const issues = [
  {
    title: '[Core] Next.js 16 Base Architecture, MongoDB & Mongoose Setup',
    assignee: 'SATWIKKKKK',
    labels: ['infrastructure', 'backend', 'p0'],
    body: `### Objective
Initialize the Next.js 16 (App Router) project inside \`/web\`, configure Tailwind CSS, and set up MongoDB Atlas connection via Mongoose.

### Tasks
- [ ] Bootstrap Next.js 16 with TypeScript and Tailwind CSS in \`/web\`.
- [ ] Implement cached MongoDB singleton connection in \`lib/mongodb.ts\`.
- [ ] Define schemas in \`models/\`:
  - \`User.ts\`: name, email (unique), passwordHash, bio, profileImageUrl, role ("user" | "admin"), createdAt.
  - \`Photograph.ts\`: owner (ref: User), title, description, imageUrl, imagePublicId, exifData, createdAt.
- [ ] Add indexes on \`photographs.createdAt\`, \`photographs.owner\`, and \`users.email\`.
- [ ] Create \`.env.example\` with required configuration keys.`
  },
  {
    title: '[Auth] Auth.js (NextAuth) Authentication & Route Protection',
    assignee: 'tejrai07',
    labels: ['auth', 'backend', 'p0'],
    body: `### Objective
Implement secure credential authentication using Auth.js, password hashing, and session protection middleware.

### Tasks
- [ ] Build \`POST /api/auth/register\` with bcrypt hashing and KIIT email domain check.
- [ ] Configure Auth.js (\`[...nextauth]/route.ts\`) with Credentials provider.
- [ ] Include user ID, email, name, and role in session/JWT callbacks.
- [ ] Build \`/login\` and \`/register\` pages with Tailwind styling and validation.
- [ ] Configure Next.js middleware to guard protected routes (\`/upload\`, \`/settings\`).`
  },
  {
    title: '[Upload] Photo Upload Pipeline & Cloudinary Storage Integration',
    assignee: 'AbhisekhNayak21',
    labels: ['backend', 'storage', 'p0'],
    body: `### Objective
Implement photograph upload route handler validating file payloads and streaming files to Cloudinary.

### Tasks
- [ ] Set up Cloudinary SDK integration in \`lib/cloudinary.ts\`.
- [ ] Create \`POST /api/photos/upload\` route with session check.
- [ ] Validate file type (JPEG, PNG, WebP) and size limit (<= 10MB).
- [ ] Upload to Cloudinary, retrieve \`secure_url\` and \`public_id\`.
- [ ] Call Python FastAPI intelligence service to extract EXIF data before saving to MongoDB.`
  },
  {
    title: '[Gallery] Public Gallery & Responsive Grid with Pagination',
    assignee: 'dristi-singh',
    labels: ['frontend', 'ui', 'p0'],
    body: `### Objective
Build the homepage public gallery loading photographs sorted newest-first in a responsive grid.

### Tasks
- [ ] Implement Server Component on \`/gallery\` or \`/\` fetching photos sorted by \`createdAt: -1\`.
- [ ] Build responsive photo grid (1 col mobile, 2 col tablet, 3-4 col desktop).
- [ ] Use \`next/image\` for optimized rendering, blur placeholders, and lazy loading.
- [ ] Implement pagination or "Load More" cursor navigation.
- [ ] Handle Loading (skeletons) and Empty states.`
  },
  {
    title: '[Photo View] Detail View Page with EXIF Metadata Card (/photos/[id])',
    assignee: 'Rishikesh2298',
    labels: ['frontend', 'ui', 'p1'],
    body: `### Objective
Create dedicated photo detail page with high-res view, photographer card, and camera EXIF specifications.

### Tasks
- [ ] Dynamic page route \`app/photos/[id]/page.tsx\`.
- [ ] High-resolution image preview with responsive scaling.
- [ ] Display photographer card (avatar, name, profile link).
- [ ] Display EXIF data badge card (Camera Make/Model, Shutter Speed, Aperture, ISO, Lens).
- [ ] Return clean 404 page if photo ID does not exist.`
  },
  {
    title: '[Profile] User Profile Showcase & Edit Profile System',
    assignee: 'Mritunjay4528',
    labels: ['frontend', 'backend', 'p1'],
    body: `### Objective
Build public user profile page displaying user bio and their photos, along with profile editing capabilities.

### Tasks
- [ ] Create public profile page \`app/users/[id]/page.tsx\`.
- [ ] Query and render all photos belonging to this user.
- [ ] Build edit profile modal/page for account owners (edit name, bio, profile image).
- [ ] Implement \`PATCH /api/users/profile\` endpoint with validation.`
  },
  {
    title: '[Python Microservice] FastAPI Photo Intelligence (EXIF & Moderation)',
    assignee: 'TheRedGrim07',
    labels: ['python', 'fastapi', 'ai', 'p1'],
    body: `### Objective
Build a lightweight Python FastAPI microservice in \`/services/image-service\` to extract EXIF metadata and perform automated safety checks.

### Tasks
- [ ] Setup FastAPI app with \`POST /api/v1/analyze-image\`.
- [ ] Use \`Pillow\` and \`exifread\` to extract: Camera Make, Model, Focal Length, Aperture, Exposure Time, ISO.
- [ ] Implement lightweight rule-based content moderation / image dimension validator.
- [ ] Return JSON payload with formatted EXIF specs and a safety pass/flag status.
- [ ] Add \`requirements.txt\` and a quick local test script.`
  },
  {
    title: '[Admin & Management] Photo Management (Edit/Delete) & Admin Moderation',
    assignee: 'sarojsenn',
    labels: ['backend', 'frontend', 'security', 'p1'],
    body: `### Objective
Allow owners to edit/delete their photos, and provide admin users with content moderation overrides.

### Tasks
- [ ] Implement \`PATCH /api/photos/[id]\` (owner only) to edit title and description.
- [ ] Implement \`DELETE /api/photos/[id]\` with cascading Cloudinary asset removal and MongoDB record deletion.
- [ ] Enforce Admin role check allowing admins to delete any photo or infringing user account.
- [ ] Add confirmation modal on the UI before deleting.`
  },
  {
    title: '[Layout] Global Navigation, Mobile Drawer & Community Guidelines',
    assignee: 'Corot-7BSumit',
    labels: ['frontend', 'ui', 'p2'],
    body: `### Objective
Build the application layout, responsive navigation header, mobile drawer menu, and community guidelines modal.

### Tasks
- [ ] Build responsive Navbar with dynamic auth states (Login/Register vs Upload/Avatar dropdown).
- [ ] Build sliding drawer menu for mobile screens.
- [ ] Implement Community Guidelines modal (accessible via footer and upload screen).
- [ ] Add global toast notification container for success/error alerts.`
  }
];

const ghPath = '"C:\\Program Files\\GitHub CLI\\gh.exe"';

for (const issue of issues) {
  console.log(`Creating issue: ${issue.title} (Assignee: @${issue.assignee})...`);
  try {
    const cmd = `${ghPath} issue create --repo ${REPO} --title "${issue.title.replace(/"/g, '\\"')}" --body "${issue.body.replace(/"/g, '\\"')}" --assignee "${issue.assignee}"`;
    const out = execSync(cmd, { encoding: 'utf-8' });
    console.log(`  ✓ ${out.trim()}`);
  } catch (err) {
    console.error(`  ✗ Error creating issue "${issue.title}":`, err.message);
  }
}
