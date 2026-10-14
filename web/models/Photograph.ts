import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPhotograph extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  imageUrl: string;
  imagePublicId: string;
  exifData?: {
    make?: string;
    model?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    exposureTime?: string;
    iso?: number;
  };
  createdAt: Date;
}

const PhotographSchema: Schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a photograph title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    imagePublicId: {
      type: String,
      required: [true, 'Image public ID is required for storage deletion'],
    },
    exifData: {
      make: String,
      model: String,
      lens: String,
      focalLength: String,
      aperture: String,
      exposureTime: String,
      iso: Number,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Optimize query for newest-first public gallery
PhotographSchema.index({ createdAt: -1 });

export const Photograph: Model<IPhotograph> =
  mongoose.models.Photograph || mongoose.model<IPhotograph>('Photograph', PhotographSchema);
