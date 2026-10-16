import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // 1. Validate Name (non-empty, 2-60 characters)
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 60 characters.' },
        { status: 400 }
      );
    }

    // 2. Validate Email format and sanitization
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Enforce @kiit.ac.in domain check if RESTRICT_KIIT_EMAIL is enabled (enabled by default)
    const isKiitRestricted = process.env.RESTRICT_KIIT_EMAIL !== 'false';
    if (isKiitRestricted && !sanitizedEmail.endsWith('@kiit.ac.in')) {
      return NextResponse.json(
        { error: 'Registration is restricted to KIIT email addresses (@kiit.ac.in).' },
        { status: 400 }
      );
    }

    // 3. Validate Password (minimum 6 characters)
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 4. Check for duplicate email
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // 5. Hash password with bcryptjs (salt rounds = 12)
    const passwordHash = await bcrypt.hash(password, 12);

    // 6. Create User document in MongoDB
    const newUser = await User.create({
      name: trimmedName,
      email: sanitizedEmail,
      passwordHash,
      role: 'user',
    });

    // 7. Return 201 Created with sanitized user object
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration route error:', error?.message || error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}
