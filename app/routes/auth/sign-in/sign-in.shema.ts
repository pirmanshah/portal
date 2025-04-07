import { z } from "zod";
import { SIGN_IN_MESSAGES } from "./sign-in.message";

export const signInSchema = z.object({
  username: z
    .string({ required_error: SIGN_IN_MESSAGES.MISSING_USERNAME })
    .min(1, SIGN_IN_MESSAGES.MISSING_USERNAME),
  password: z
    .string({ required_error: SIGN_IN_MESSAGES.MISSING_PASSWORD })
    .min(1, SIGN_IN_MESSAGES.MISSING_PASSWORD),
});
