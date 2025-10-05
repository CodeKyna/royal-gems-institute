import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import {
  verifyPassword,
  generateTokens,
  verify2FAToken,
  generateCSRFToken,
} from "@/lib/security/auth";
import {
  logAction,
  isRateLimited,
  generateSessionId,
} from "@/lib/security/middleware";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password, twoFactorToken } = await request.json();

    // Rate limiting for login attempts
    const rateLimitKey = `rate_limit:login:${
      request.headers.get("x-forwarded-for") || "unknown"
    }`;

    if (await isRateLimited(rateLimitKey, 5, 15 * 60 * 1000)) {
      // 5 attempts per 15 minutes
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Find user and include sensitive fields for authentication
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password +twoFactorSecret"
    );

    if (!user || !user.isActive) {
      await logAction(
        "unknown",
        email,
        "LOGIN_FAILED",
        "auth",
        undefined,
        { reason: "Invalid credentials" },
        request,
        false,
        "Invalid email or user inactive"
      );

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
      await logAction(
        user._id.toString(),
        user.email,
        "LOGIN_FAILED",
        "auth",
        undefined,
        { reason: "Account locked" },
        request,
        false,
        "Account is locked due to multiple failed attempts"
      );

      return NextResponse.json(
        {
          error:
            "Account is temporarily locked due to multiple failed login attempts",
        },
        { status: 423 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      // Increment login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 minutes
      }

      await user.save();

      await logAction(
        user._id.toString(),
        user.email,
        "LOGIN_FAILED",
        "auth",
        undefined,
        { reason: "Invalid password", attempts: user.loginAttempts },
        request,
        false,
        "Invalid password"
      );

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!twoFactorToken) {
        return NextResponse.json(
          {
            error: "Two-factor authentication token required",
            requires2FA: true,
          },
          { status: 200 }
        );
      }

      const isValid2FA = verify2FAToken(twoFactorToken, user.twoFactorSecret!);
      if (!isValid2FA) {
        await logAction(
          user._id.toString(),
          user.email,
          "LOGIN_FAILED",
          "auth",
          undefined,
          { reason: "Invalid 2FA token" },
          request,
          false,
          "Invalid 2FA token"
        );

        return NextResponse.json(
          { error: "Invalid two-factor authentication token" },
          { status: 401 }
        );
      }
    }

    // Check if user has admin privileges
    if (!["SuperAdmin", "Admin", "Moderator"].includes(user.role)) {
      await logAction(
        user._id.toString(),
        user.email,
        "LOGIN_FAILED",
        "auth",
        undefined,
        { reason: "Insufficient privileges" },
        request,
        false,
        "User does not have admin privileges"
      );

      return NextResponse.json(
        { error: "Access denied. Insufficient privileges." },
        { status: 403 }
      );
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
    });

    // Generate CSRF token and session ID
    const csrfToken = generateCSRFToken();
    const sessionId = generateSessionId();

    // Log successful login
    await logAction(
      user._id.toString(),
      user.email,
      "LOGIN",
      "auth",
      undefined,
      { role: user.role, twoFactorUsed: user.twoFactorEnabled },
      request,
      true
    );

    // Set secure cookies
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });

    // Set cookies with security flags
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    response.cookies.set("csrfToken", csrfToken, {
      httpOnly: false, // Accessible to JavaScript for CSRF protection
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    response.cookies.set("lastActivity", Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
