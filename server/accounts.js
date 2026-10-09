/** Creating a grown-up's or a learner's account — shared by the sign-up routes. */
import * as db from "./db.js";
import { hashPassword } from "./auth.js";

/**
 * @param {object} args
 * @param {string} args.email     already normalised
 * @param {string} args.password
 * @param {{accountType: string, ageBand: string|null}} args.account  from normaliseAccountFields
 * @param {{verified: boolean}} [args.verification]  omitted by the old route: no field written
 * @throws {Error} EMAIL_TAKEN
 */
export async function createParentAccount({ email, password, account, verification }) {
  if (await db.parents().findOne({ email })) throw new Error("EMAIL_TAKEN");

  const { hash, salt, iterations } = await hashPassword(password);
  const createdAt = new Date().toISOString();
  const parent = {
    email,
    passwordHash: hash,
    passwordSalt: salt,
    iterations,
    accountType: account.accountType,
    ageBand: account.ageBand,
    createdAt,
    ...(verification
      ? { emailVerified: verification.verified, emailVerifiedAt: verification.verified ? createdAt : null }
      : {}),
  };
  try {
    const { insertedId } = await db.parents().insertOne(parent);
    return { ...parent, _id: insertedId };
  } catch (err) {
    if (err.code === 11000) throw new Error("EMAIL_TAKEN");
    throw err;
  }
}
