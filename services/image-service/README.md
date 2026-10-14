# Image Intelligence Microservice (Python FastAPI)

**Lead Engineer**: `@TheRedGrim07` (Ayush Sinha) & `@sarojsenn` (Saroj Sen)

This service processes uploaded photographs to extract camera EXIF specifications (Make, Model, Lens, Aperture, ISO, Shutter Speed) and performs content validation.

## Local Setup

1. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   # source venv/bin/activate # Linux/Mac
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. Interactive Swagger documentation:
   Open [http://localhost:8000/docs](http://localhost:8000/docs)
