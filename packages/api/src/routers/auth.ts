import { z } from "zod";
import { router, publicProcedure } from "../server.js";
import { verifyGoogleIdToken } from "../lib/googleAuth.js";

export const authRouter = router({
  /**
   * Verify Google ID Token
   *
   * This endpoint verifies a Google ID token and returns the verified user information.
   * It does NOT perform any database operations, session creation, or user persistence.
   *
   * Use this for:
   * - Testing Google OAuth integration
   * - Inspecting verified user details
   * - Validating token structure
   */
  verifyGoogle: publicProcedure
    .input(
      z.object({
        idToken: z.string().min(1, "ID token is required"),
      })
    )
    .mutation(async ({ input }) => {
      const verifiedUser = await verifyGoogleIdToken(input.idToken);

      console.log("✅ Google ID Token Verified Successfully");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Google User ID (sub):", verifiedUser.sub);
      console.log("Email:", verifiedUser.email);
      console.log("Email Verified:", verifiedUser.email_verified);
      console.log("Name:", verifiedUser.name || "(not provided)");
      console.log("Picture URL:", verifiedUser.picture || "(not provided)");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Return the verified user information
      return {
        success: true,
        user: verifiedUser,
      };
    }),
});
