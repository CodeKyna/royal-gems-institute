import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { generatePasswordResetToken } from '@/lib/security/auth';
import { logAction } from '@/lib/security/middleware';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

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

    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Don't reveal if email exists or not for security
    const response = NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });

    if (!user || !user.isActive) {
      await logAction(
        'unknown',
        email,
        'PASSWORD_RESET',
        'auth',
        undefined,
        { reason: 'Email not found or user inactive' },
        request,
        false,
        'Password reset requested for non-existent or inactive user'
      );
      
      return response; // Still return success to not reveal user existence
    }

    // Generate reset token
    const resetToken = generatePasswordResetToken();
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Royal Gems Institute - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Password Reset Request</h2>
          <p>Hello ${user.firstName},</p>
          <p>You have requested a password reset for your Royal Gems Institute admin account.</p>
          <p>Please click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
          <p>This link will expire in 15 minutes for security reasons.</p>
          <p>If you did not request this password reset, please ignore this email and contact your administrator.</p>
          <p>Best regards,<br>Royal Gems Institute Security Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    await logAction(
      user._id.toString(),
      user.email,
      'PASSWORD_RESET',
      'auth',
      user._id.toString(),
      { tokenGenerated: true },
      request,
      true
    );

    return response;

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}