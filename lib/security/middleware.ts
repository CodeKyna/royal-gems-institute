import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';
import AuditLog from '../models/AuditLog';
import dbConnect from '../db';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    twoFactorEnabled: boolean;
  };
}

// Authentication middleware
export const authenticate = async (request: NextRequest): Promise<{ user: any; error?: string }> => {
  try {
    const token = request.cookies.get('accessToken')?.value;
    
    if (!token) {
      return { user: null, error: 'No access token provided' };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return { user: null, error: 'Invalid or expired token' };
    }

    return { user: decoded };
  } catch (error) {
    return { user: null, error: 'Authentication failed' };
  }
};

// Role-based access control
export const authorize = (allowedRoles: string[]) => {
  return (user: any): boolean => {
    if (!user || !user.role) {
      return false;
    }
    return allowedRoles.includes(user.role);
  };
};

// CSRF protection
export const verifyCSRF = (request: NextRequest): boolean => {
  if (request.method === 'GET') {
    return true; // GET requests don't need CSRF protection
  }

  const csrfToken = request.headers.get('x-csrf-token');
  const sessionCsrfToken = request.cookies.get('csrfToken')?.value;

  return csrfToken === sessionCsrfToken;
};

// Audit logging
export const logAction = async (
  adminId: string,
  adminEmail: string,
  action: string,
  resource: string,
  resourceId: string | undefined,
  details: Record<string, any>,
  request: NextRequest,
  success: boolean,
  errorMessage?: string
) => {
  try {
    await dbConnect();
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await AuditLog.create({
      adminId,
      adminEmail,
      action,
      resource,
      resourceId,
      details,
      ipAddress,
      userAgent,
      success,
      errorMessage
    });
  } catch (error) {
    console.error('Failed to log audit action:', error);
  }
};

// Session validation
export const validateSession = async (request: NextRequest): Promise<boolean> => {
  const sessionId = request.cookies.get('sessionId')?.value;
  const lastActivity = request.cookies.get('lastActivity')?.value;
  
  if (!sessionId || !lastActivity) {
    return false;
  }

  const lastActivityTime = parseInt(lastActivity);
  const sessionTimeout = parseInt(process.env.SESSION_TIMEOUT || '1800000'); // 30 minutes
  
  if (Date.now() - lastActivityTime > sessionTimeout) {
    return false;
  }

  return true;
};

// Rate limiting helper
export const isRateLimited = async (key: string, limit: number, windowMs: number): Promise<boolean> => {
  // In a production environment, you would use Redis or similar
  // For now, we'll implement a simple in-memory rate limiter
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (record.count >= limit) {
    return true;
  }
  
  record.count++;
  return false;
};

// Password reset token validation
export const validatePasswordResetToken = (token: string, expires: Date): boolean => {
  if (!token || !expires) {
    return false;
  }
  
  return new Date() < expires;
};

// Check if user account is locked
export const isAccountLocked = (loginAttempts: number, lockUntil?: Date): boolean => {
  if (!lockUntil) {
    return false;
  }
  
  return loginAttempts >= 5 && new Date() < lockUntil;
};

// Generate secure session ID
export const generateSessionId = (): string => {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
};