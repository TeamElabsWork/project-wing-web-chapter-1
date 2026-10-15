### 🎯 User Story
As any visitor or user, I want an intuitive, responsive navigation header that clearly shows my sign-in status, offers easy mobile access via a drawer menu, and provides clear access to Community Guidelines, so that I can seamlessly navigate the site on both desktop and mobile devices.

---

### 📖 Context & Scope
The visual shell of the platform defines the user experience. The Navbar must dynamically adapt between unauthenticated visitors (Browse, Sign In, Join Community) and authenticated creators (Upload button, User Avatar dropdown with profile/signout). On mobile, a smooth slide-out hamburger menu drawer must provide access to all links. Additionally, a Community Guidelines modal is required to inform users about original content ownership and prohibited uploads.

---

### 🛠️ Technical Implementation Guide

#### 1. Dynamic Navbar State Integration (`components/layout/Navbar.tsx`)
- Read active session from Auth.js (`auth()` or `useSession()`).
- Unauthenticated view:
  - Links: "Gallery", "Sign In" button, "Join Community" primary button.
- Authenticated view:
  - "Upload (+)" action button with distinctive accent styling.
  - User avatar dropdown menu showing:
    - User name & email.
    - "My Portfolio" (`/users/[myId]`).
    - "Settings".
    - "Sign Out" button (calling `signOut()`).

#### 2. Mobile Drawer Navigation
- Slide-over / animated hamburger menu for viewports < 768px (`md:`).
- Smooth backdrop blur and overlay when drawer is open.
- Auto-close drawer on route navigation or escape key press.
- Ensure all interactive elements have minimum 44px tap targets for mobile touch ergonomics.

#### 3. Community Guidelines Modal (`components/layout/GuidelinesModal.tsx`)
- Accessible from both the footer and the upload screen.
- Clear rules outline:
  - 1. **Original Work Only**: You must own copyright to all photographs uploaded.
  - 2. **No Inappropriate Content**: Strictly no explicit, hateful, or harmful imagery.
  - 3. **Respectful Community**: Respect fellow student creators.
  - 4. **Moderation Policy**: Violating content will be removed immediately by administrators.

---

### ⚠️ Edge Cases & Accessibility (A11y)
- **Keyboard navigation**: Support Escape key to close modals and drawer; maintain focus trap while open.
- **A11y contrast**: Ensure all text meets WCAG AA standards (4.5:1 contrast against dark background).

---

### ✅ Definition of Done (DoD)
- [ ] Navbar switches dynamically between logged-in and logged-out states.
- [ ] Logged-in users can click their avatar to view dropdown and sign out.
- [ ] Mobile hamburger drawer opens and closes smoothly across phone screen sizes.
- [ ] Community Guidelines modal renders cleanly and is accessible from footer and upload flows.
- [ ] Zero horizontal scrollbars or overflow bugs on mobile devices (320px–425px).
