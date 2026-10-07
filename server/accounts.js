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
  const { insertedId } = await db.parents().insertOne(parent);

  // The `email` index is NOT unique, so two concurrent sign-ups can both pass
  // the check above. The later insert deletes itself.
  const duplicates = await db.parents().find({ email }, { projection: { _id: 1 } }).sort({ _id: 1 }).toArray();
  if (duplicates.length > 1 && !insertedId.equals(duplicates[0]._id)) {
    await db.parents().deleteOne({ _id: insertedId });
    throw new Error("EMAIL_TAKEN");
  }
  return { ...parent, _id: insertedId };
}
