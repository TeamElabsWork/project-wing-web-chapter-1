### 🎯 User Story
As a university student, I want to create an account using my KIIT email, log in securely, and stay signed in across browser sessions, so that I can upload my photography work and manage my portfolio.

---

### 📖 Context & Scope
The platform uses Auth.js (v5) with credentials-based authentication. We need an end-to-end user registration and sign-in flow that validates KIIT domain emails (`@kiit.ac.in`), securely hashes passwords with `bcryptjs`, and guards private routes (like `/upload` and `/settings`) via Next.js middleware.

---

### 🛠️ Technical Implementation Guide

#### 1. Registration Endpoint (`app/api/auth/register/route.ts`)
- **`POST /api/auth/register`**:
  - Input: `{ name, email, password }`.
  - Validation:
    - Name: non-empty, 2–60 characters.
    - Email: valid email format. Enforce `@kiit.ac.in` domain check (with an environment toggle `RESTRICT_KIIT_EMAIL=true`).
    - Password: minimum 6 characters.
  - Check if `User.findOne({ email })` exists. If so, return `409 Conflict` ("An account with this email already exists").
  - Hash password using `await bcrypt.hash(password, 12)`.
  - Create `User` document in MongoDB with default `role: 'user'`.
  - Return `201 Created` with sanitized user object (excluding `passwordHash`).

#### 2. Auth Pages (`app/(auth)/login/page.tsx` & `app/(auth)/register/page.tsx`)
- Build clean, accessible forms styled with Tailwind CSS.
- Include clear error messages:
  - Non-KIIT email warning.
  - Invalid credentials alert.
  - Duplicate email notice.
- Implement loading states with disabled buttons and spinners during submission.
- On successful login, redirect user to the gallery or their target redirect URL.

#### 3. Route Protection Middleware (`middleware.ts`)
- Create `middleware.ts` in the root of `/web`.
- Use NextAuth's `auth` middleware to inspect incoming requests.
- Protect paths matching `/upload/:path*` and `/settings/:path*`.
- Unauthenticated requests must be redirected to `/login?callbackUrl=...`.

---

### ⚠️ Edge Cases & Security
- **Timing attacks & Password Security**: Always hash with `bcryptjs` (salt rounds >= 10). Never log raw passwords.
- **Case-insensitivity**: Always sanitize emails to lowercase before searching or inserting into MongoDB.
- **Session Expiry**: Handle expired sessions gracefully without white-screen crashes.

---

### ✅ Definition of Done (DoD)
- [ ] Students can register with a name, valid KIIT email, and password.
- [ ] Duplicate email registrations return HTTP 409 with an actionable UI error.
- [ ] Users can log in using their credentials and persist session via HTTP-only JWT cookies.
- [ ] Visiting `/upload` while logged out redirects cleanly to `/login`.
- [ ] Passwords in MongoDB are never plain text.
