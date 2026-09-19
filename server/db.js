/**
 * One MongoClient for the whole process.
 *
 * The driver maintains its own connection pool, so a client is created and
 * connected exactly once and reused for every request. Connecting per-request
 * would open a new pool per request and exhaust the cluster's connection limit.
 */
import { MongoClient } from "mongodb";

const DB_NAME = "dynamic_learning";

let client = null;
let db = null;

/**
 * Connects the shared client. Safe to call once at boot; idempotent.
 * @param {string} uri
 */
export async function connect(uri = process.env.MONGODB_URI, dbName = process.env.MONGODB_DB || DB_NAME) {
  if (db) return db;
  if (!uri) throw new Error("MONGODB_URI_REQUIRED");
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function close() {
  if (client) await client.close();
  client = null;
  db = null;
}

function getDb() {
  if (!db) throw new Error("DB_NOT_CONNECTED");
  return db;
}

export const parents = () => getDb().collection("parents");
export const children = () => getDb().collection("children");
export const progress = () => getDb().collection("progress");
export const rewards = () => getDb().collection("rewards");
