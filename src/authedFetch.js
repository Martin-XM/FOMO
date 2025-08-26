import { auth } from "./firebase";

export async function authedFetch(path, options={}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Nepřihlášený uživatel");

  const idToken = await user.getIdToken(/* forceRefresh? */ false);

  const base = import.meta.env.VITE_FIREBASE_URL;
  const sep = path.includes("?") ? "&" : "?";
  const url = `${base}${path}${sep}auth=${encodeURIComponent(idToken)}`;

  return fetch(url, options);
}