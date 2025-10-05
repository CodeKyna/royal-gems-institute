import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { generate2FASecret, generateQRCode } from "@/lib/security/auth";
import { authenticate, logAction } from "@/lib/security/middleware";
import speakeasy from "speakeasy";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { user, error } = await authenticate(request);

    if (error || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const dbUser = await User.findById(user.id);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (dbUser.twoFactorEnabled) {
      return NextResponse.json(
        { error: "Two-factor authentication is already enabled" },
        { status: 400 }
      );
    }

    // Generate 2FA secret
    const { secret, otpauthUrl } = generate2FASecret(user.email);
    const qrCode = otpauthUrl ? await generateQRCode(otpauthUrl) : null;

    // Store the secret temporarily (not enabled until verified)
    dbUser.twoFactorSecret = secret;
    await dbUser.save();

    await logAction(
      user.id,
      user.email,
      "2FA_ENABLE",
      "user",
      user.id,
      { step: "secret_generated" },
      request,
      true
    );

    return NextResponse.json({
      success: true,
      qrCode,
      secret, // Backup codes could be generated here
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { user, error } = await authenticate(request);

    if (error || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    const dbUser = await User.findById(user.id).select("+twoFactorSecret");
    if (!dbUser || !dbUser.twoFactorSecret) {
      return NextResponse.json(
        { error: "No 2FA setup in progress" },
        { status: 400 }
      );
    }

    // Verify the token

    const verified = speakeasy.totp.verify({
      secret: dbUser.twoFactorSecret,
      encoding: "base32",
      token,
      window: 2,
    });

    if (!verified) {
      await logAction(
        user.id,
        user.email,
        "2FA_ENABLE",
        "user",
        user.id,
        { step: "verification_failed" },
        request,
        false,
        "Invalid verification token"
      );

      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Enable 2FA
    dbUser.twoFactorEnabled = true;
    await dbUser.save();

    await logAction(
      user.id,
      user.email,
      "2FA_ENABLE",
      "user",
      user.id,
      { step: "enabled" },
      request,
      true
    );

    return NextResponse.json({
      success: true,
      message: "Two-factor authentication enabled successfully",
    });
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { user, error } = await authenticate(request);

    if (error || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required to disable 2FA" },
        { status: 400 }
      );
    }

    const dbUser = await User.findById(user.id).select("+password");
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify password for security

    const isValidPassword = await bcrypt.compare(password, dbUser.password);

    if (!isValidPassword) {
      await logAction(
        user.id,
        user.email,
        "2FA_DISABLE",
        "user",
        user.id,
        { step: "password_verification_failed" },
        request,
        false,
        "Invalid password"
      );

      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Disable 2FA
    dbUser.twoFactorEnabled = false;
    dbUser.twoFactorSecret = undefined;
    await dbUser.save();

    await logAction(
      user.id,
      user.email,
      "2FA_DISABLE",
      "user",
      user.id,
      { step: "disabled" },
      request,
      true
    );

    return NextResponse.json({
      success: true,
      message: "Two-factor authentication disabled successfully",
    });
  } catch (error) {
    console.error("2FA disable error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
