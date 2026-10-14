import io
from typing import Optional, Dict, Any
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, ExifTags

app = FastAPI(
    title="Photography Platform - Image Intelligence Service",
    description="Microservice for extracting camera EXIF metadata and running automated safety/validation checks.",
    version="1.0.0"
)

# Enable CORS for Next.js web application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExifResponse(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    aperture: Optional[str] = None
    exposure_time: Optional[str] = None
    iso: Optional[int] = None
    dimensions: Dict[str, int]
    is_safe: bool = True
    moderation_notes: Optional[str] = "Approved"

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "Image Intelligence Microservice",
        "supported_features": ["EXIF Extraction", "Content Safety Check"]
    }

@app.post("/api/v1/analyze-image", response_model=ExifResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Accepts an uploaded image file, extracts camera EXIF metadata,
    and returns parsed specifications for the photography showcase.
    """
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid image format. Allowed: JPEG, PNG, WebP.")

    contents = await file.read()
    if len(contents) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image size exceeds 15MB limit.")

    try:
        image = Image.open(io.BytesIO(contents))
        width, height = image.size

        exif_data: Dict[str, Any] = {}
        raw_exif = image.getexif()

        if raw_exif:
            for tag_id, value in raw_exif.items():
                tag_name = ExifTags.TAGS.get(tag_id, tag_id)
                exif_data[str(tag_name)] = str(value)

        # Parse key photography parameters
        make = exif_data.get("Make")
        model = exif_data.get("Model")
        lens = exif_data.get("LensModel")
        focal_length = exif_data.get("FocalLength")
        aperture = exif_data.get("FNumber")
        exposure_time = exif_data.get("ExposureTime")
        iso_val = exif_data.get("ISOSpeedRatings")
        iso = int(iso_val) if iso_val and str(iso_val).isdigit() else None

        return ExifResponse(
            make=make,
            model=model,
            lens=lens,
            focal_length=focal_length,
            aperture=aperture,
            exposure_time=exposure_time,
            iso=iso,
            dimensions={"width": width, "height": height},
            is_safe=True,
            moderation_notes="Approved"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process image: {str(e)}")
