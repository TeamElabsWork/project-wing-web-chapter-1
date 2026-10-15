import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Photograph } from '@/models/Photograph';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const [photos, total] = await Promise.all([
      Photograph.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('owner', 'name profileImageUrl')
        .lean(),
      Photograph.countDocuments({}),
    ]);

    return NextResponse.json({
      photos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + photos.length < total,
      },
    });
  } catch (error: any) {
    console.error('Error fetching photographs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photographs', details: error.message },
      { status: 500 }
    );
  }
}
