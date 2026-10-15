import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO = 'TeamElabsWork/project-wing-web-chapter-1';
const ghPath = '"C:\\Program Files\\GitHub CLI\\gh.exe"';

const issueUpdates = [
  {
    number: 1,
    title: '[Feature] Photo Ownership Management: Edit Metadata & Permanent Deletion',
    file: 'scripts/issues/issue-1.md'
  },
  {
    number: 2,
    title: '[Feature] User Authentication System: Registration, Login & Route Protection',
    file: 'scripts/issues/issue-2.md'
  },
  {
    number: 3,
    title: '[Feature] Interactive Photo Detail Page (/photos/[id]), Lightbox & Camera Specs',
    file: 'scripts/issues/issue-3.md'
  },
  {
    number: 4,
    title: '[Feature] Photographer Showcase Portfolio & Profile Management (/users/[id])',
    file: 'scripts/issues/issue-4.md'
  },
  {
    number: 5,
    title: '[Feature] Admin Moderation System & Content Safety Enforcement',
    file: 'scripts/issues/issue-5.md'
  },
  {
    number: 6,
    title: '[Feature] Global Navigation Shell, Mobile Drawer & Community Guidelines',
    file: 'scripts/issues/issue-6.md'
  },
  {
    number: 7,
    title: '[Feature] Photograph Upload Workflow: File Validation, Drag-and-Drop UI & Cloudinary Pipeline',
    file: 'scripts/issues/issue-7.md'
  },
  {
    number: 8,
    title: '[Feature] Python FastAPI Microservice: Camera EXIF Extraction & Content Safety Analysis',
    file: 'scripts/issues/issue-8.md'
  },
  {
    number: 9,
    title: '[Feature] Public Discovery Gallery: Infinite Scroll / Pagination & Responsive Grid',
    file: 'scripts/issues/issue-9.md'
  }
];

for (const update of issueUpdates) {
  console.log(`Updating Issue #${update.number}: ${update.title}...`);
  try {
    const filePath = path.resolve(process.cwd(), update.file);
    const cmd = `${ghPath} issue edit ${update.number} --repo ${REPO} --title "${update.title.replace(/"/g, '\\"')}" --body-file "${filePath}"`;
    const out = execSync(cmd, { encoding: 'utf-8' });
    console.log(`  ✓ Updated: ${out.trim()}`);
  } catch (err) {
    console.error(`  ✗ Error updating issue #${update.number}:`, err.message);
  }
}
