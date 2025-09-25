import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Password reset functionality has been disabled
    // Contact administrator for password assistance
    return NextResponse.json(
      { 
        message: 'Password reset functionality is currently disabled. Please contact your administrator for assistance.',
        disabled: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}