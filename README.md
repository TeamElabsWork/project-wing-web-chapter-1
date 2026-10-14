# Photography Showcase Platform

> An open web platform for KIIT University students and photography enthusiasts to publish, share, and discover original photography work without club membership barriers.

---

## 🛠️ Tech Stack & Architecture

This repository is structured as a lightweight monorepo containing the main web application and an auxiliary image intelligence microservice:

- **Web Application (`/web`)**:
  - **Framework**: Next.js 16 (App Router, React 19, TypeScript)
  - **Styling**: Tailwind CSS
  - **Database & ODM**: MongoDB Atlas + Mongoose
  - **Authentication**: Auth.js / NextAuth (Credentials provider with bcrypt password hashing)
  - **Image Storage**: Cloudinary SDK
- **Photo Intelligence Service (`/services/image-service`)**:
  - **Framework**: Python FastAPI
  - **Capabilities**: Camera EXIF metadata extraction (`exifread`, `Pillow`) & automated safety/moderation filtering

---

## 👥 Team & Ownership Roster

| # | Feature / Milestone | Assignee | Primary Focus |
|---|---|---|---|
| **Issue #1** | **Next.js 16 Setup, MongoDB & Mongoose Schemas** | `@SATWIKKKKK` (Satwik Chandra) | Base Next.js app, Mongoose connection singleton, Schemas |
| **Issue #2** | **Auth.js Authentication & Route Protection** | `@tejrai07` (Tejash Rai) | Credentials login, registration with KIIT email check, session guard |
| **Issue #3** | **Photograph Upload Pipeline & Cloudinary Storage** | `@AbhisekhNayak21` (Abhisekh Nayak) | Server-side upload route, Cloudinary integration, file validation |
| **Issue #4** | **Public Gallery & Responsive Grid with Pagination** | `@dristi-singh` (Dristi Singh) | Homepage gallery, responsive grid, Next.js image optimization |
| **Issue #5** | **Photograph Detail Page with EXIF Metadata Card** | `@Rishikesh2298` (Rishikesh Kumar) | Dynamic `/photos/[id]` page, high-res view, photographer details |
| **Issue #6** | **User Profile Page & Profile Settings** | `@Mritunjay4528` (Mritunjay Kumar Mandal) | `/users/[id]` showcase, photo collection grid, bio & avatar editor |
| **Issue #7** | **FastAPI Photo Intelligence Service (EXIF + Moderation)** | `@TheRedGrim07` (Ayush Sinha) | Python microservice for EXIF parsing and content safety checks |
| **Issue #8** | **Admin Moderation Controls & Photo Management** | `@sarojsenn` (Saroj Sen) | Owner edit/delete, admin deletion override, admin seed script |
| **Issue #9** | **Global Navigation, Mobile Drawer & Guidelines Modal** | `@Corot-7BSumit` (Sumit Bag) | Navbar, mobile hamburger drawer, community guidelines modal |

---

## 📁 Repository Structure

```text
project-wing-web-chapter-1/
├── web/                           # Next.js 16 Web Application
│   ├── app/                       # App Router routes & pages
│   │   ├── (auth)/                # Login & Register views
│   │   ├── api/                   # API Route Handlers (auth, photos, users)
│   │   ├── photos/[id]/           # Photo detail page
│   │   ├── users/[id]/            # User profile page
│   │   ├── upload/                # Photo upload form
│   │   ├── layout.tsx
│   │   └── page.tsx               # Homepage gallery
│   ├── components/                # Modular React UI components
│   │   ├── gallery/               # PhotoCard, PhotoGrid, Skeletons
│   │   ├── layout/                # Navbar, Footer, MobileNav
│   │   └── ui/                    # Modals, Buttons, Toasts
│   ├── lib/                       # Utilities (mongodb.ts, cloudinary.ts, auth.ts)
│   ├── models/                    # Mongoose Data Models (User.ts, Photograph.ts)
│   └── .env.example
├── services/
│   └── image-service/             # Python FastAPI Photo Intelligence Microservice
│       ├── main.py
│       ├── requirements.txt
│       └── README.md
└── scripts/
    └── create-issues.mjs          # Script to create all 9 GitHub issues
```

---

## 🚀 Getting Started

### 1. Web Application (`/web`)
```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Python Image Service (`/services/image-service`)
```bash
cd services/image-service
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger API documentation.

---

## 🌿 Git & Collaboration Workflow

1. Always branch off the `dev` branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/issue-X-description
   ```
2. Commit with conventional messages (e.g., `feat(auth): implement credentials login`).
3. Open a Pull Request into `dev` and reference the issue: `Closes #X`.
4. Merge into `main` only for tagged releases.
