import { OAuth2Client } from "google-auth-library";
import { TRPCError } from "@trpc/server";

export interface GoogleUserPayload {
  sub: string; // Google user ID
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
}

/**
 @param idToken - The Google ID token to verify
 */
export async function verifyGoogleIdToken(
  idToken: string
): Promise<GoogleUserPayload> {
  const clientId = process.env.GOOGLE_ANDROID_CLIENT_ID;

  if (!clientId) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "GOOGLE_ANDROID_CLIENT_ID environment variable is not configured",
    });
  }

  const client = new OAuth2Client(clientId);

  try {
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token: empty payload",
      });
    }

    // Verify required fields exist
    if (!payload.sub) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token: missing sub (user ID)",
      });
    }

    if (!payload.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token: missing email",
      });
    }

    // Return verified user information
    return {
      sub: payload.sub,
      email: payload.email,
      email_verified: payload.email_verified ?? false,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error;
    }

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        error instanceof Error ? error.message : "Token verification failed",
    });
  }
}
