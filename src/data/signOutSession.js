/** Forget local identity only after the remote cookie session has ended. */
export async function signOutSession(store, forget) {
  if (typeof store.signOutParent === "function") await store.signOutParent();
  forget();
}
