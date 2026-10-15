### 🎯 User Story
As the platform development team and community, we want a dedicated Python microservice that analyzes uploaded images to extract camera EXIF specs (make, model, lens, exposure time, aperture, ISO) and run automated safety checks, so that the photography showcase features rich camera details while filtering out inappropriate files.

---

### 📖 Context & Scope
Located in `/services/image-service`, this standalone Python FastAPI microservice utilizes Python's mature imaging libraries (`Pillow`, `exifread`) to process incoming image files. When the Next.js backend receives an upload, it passes the image to this service. The service parses camera hardware specifications and performs safety heuristic checks, returning structured metadata.

---

### 🛠️ Technical Implementation Guide

#### 1. Microservice Endpoints (`services/image-service/main.py`)
- **`GET /`**: Health check returning `{ status: "online", version: "1.0.0" }`.
- **`POST /api/v1/analyze-image`**:
  - Accepts `file: UploadFile = File(...)`.
  - Validate image format (JPEG, PNG, WebP) and enforce max size limit (15MB).
  - Extract EXIF metadata using `Pillow` and `exifread`:
    - Camera Make (`Make`) and Model (`Model`).
    - Lens Model (`LensModel` or `LensSpecification`).
    - Focal Length (`FocalLength`, formatted as "50mm").
    - F-Number / Aperture (`FNumber`, formatted as "f/1.8").
    - Exposure Time / Shutter Speed (`ExposureTime`, formatted as "1/500s").
    - ISO Speed Rating (`ISOSpeedRatings`, integer).
  - Extract image physical dimensions (`width`, `height`).

#### 2. Automated Safety & Content Checks
- Implement basic safety validation rules:
  - Minimum aspect ratio / resolution check (flag extreme aspect ratio spam).
  - Image corruption check (ensure image buffer can be decoded without errors).
  - Safety heuristics (flag for review if metadata contains prohibited keywords or corrupted segments).
  - Return `is_safe: boolean` and `moderation_notes: string`.

#### 3. Service Hardening & Testing
- Add automated unit test suite in `tests/test_analyzer.py` using `pytest` and `httpx`:
  - Test valid JPEG with sample EXIF data.
  - Test image without EXIF data (ensure null-safety without crashes).
  - Test invalid non-image file payload (verify 400 Bad Request response).
- Document containerization (`Dockerfile`) or local launch command in `README.md`.

---

### ⚠️ Edge Cases & Reliability
- **Stripped / Missing EXIF**: Many mobile/social images have EXIF data stripped. The service must NEVER fail on missing tags; all EXIF fields must be strictly optional with `None` fallbacks.
- **Fraction formatting**: Convert raw EXIF rational tuples (e.g. `(1, 250)`) into standard human-readable photography formats (`1/250s`, `f/2.8`).

---

### ✅ Definition of Done (DoD)
- [ ] Microservice starts with `uvicorn main:app --reload --port 8000` without errors.
- [ ] `POST /api/v1/analyze-image` successfully extracts camera make, model, lens, aperture, shutter speed, and ISO from sample photos.
- [ ] Images without EXIF metadata return cleanly with null fields and dimensions populated.
- [ ] Automated tests pass with `pytest`.
- [ ] Interactive Swagger UI available at `http://localhost:8000/docs`.
