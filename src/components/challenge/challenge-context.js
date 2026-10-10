import { createContext } from "react";

/**
 * Which curriculum challenge is on screen: `{ year, subject }`, provided by
 * ProblemView around the loaded challenge. Null anywhere else (Skills Mode,
 * tests), so a reader must treat it as optional.
 *
 * ChallengeShell reads it to show "Read it to me" on Maths only: English and
 * Science challenges place their own SpeakButtons beside the words they mean.
 */
export const ChallengeContext = createContext(null);
