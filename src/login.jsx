import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  loginRow,
  loginInput,
  loginButton,
  logoutButton,
  loggedInWrap,
  loggedInEmail,
} from "./tailwindClasses.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setStatus("");
    });
    return () => unsub();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setStatus("Přihlašuji…");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setStatus("");
      setEmail("");
      setPass("");
    } catch (e) {
      setStatus(e.message || "Chyba přihlášení");
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setEmail("");
    setPass("");
    setStatus("");
  }

  if (user) {
    return (
      <div className={loggedInWrap}>
        <div className={loggedInEmail}>
          Přihlášen: <strong>{user.email}</strong>
        </div>
        <button type="button" className={logoutButton} onClick={handleLogout}>
          Odhlásit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className={loginRow}>
      <input
        className={loginInput}
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={loginInput}
        placeholder="Heslo"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button type="submit" className={loginButton}>
        Přihlásit
      </button>
      {status && <div className="text-xs">{status}</div>}
    </form>
  );
}
