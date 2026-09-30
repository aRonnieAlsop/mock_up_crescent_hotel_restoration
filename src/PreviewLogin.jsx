import { useEffect, useState } from "react";

const LOGIN_EMAIL = "frontdesk@crescenthotelandstore.com";
const LOGIN_PASSWORD = "Bringthesomething1234!";

const SESSION_KEY = "crescent-preview-session";
const SESSION_LENGTH = 60 * 60 * 1000;

function readSession() {
  try {
    const expiresAt = Number(sessionStorage.getItem(SESSION_KEY));

    return Number.isFinite(expiresAt) && expiresAt > Date.now()
      ? expiresAt
      : null;
  } catch {
    return null;
  }
}

export default function PreviewLogin({ children }) {
  const [expiresAt, setExpiresAt] = useState(readSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!expiresAt) return;

    function checkExpiry() {
      if (Date.now() >= expiresAt) {
        sessionStorage.removeItem(SESSION_KEY);
        setExpiresAt(null);
        setPassword("");
        setError("Your preview session ended. Please sign in again.");
      }
    }

    const timer = window.setTimeout(
      checkExpiry,
      Math.max(0, expiresAt - Date.now())
    );

    // Also check when returning to a sleeping or background tab.
    window.addEventListener("focus", checkExpiry);
    document.addEventListener("visibilitychange", checkExpiry);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", checkExpiry);
      document.removeEventListener("visibilitychange", checkExpiry);
    };
  }, [expiresAt]);

  function handleSubmit(event) {
    event.preventDefault();

    const emailMatches =
      email.trim().toLowerCase() === LOGIN_EMAIL.trim().toLowerCase();

    if (!emailMatches || password !== LOGIN_PASSWORD) {
      setError("Please check your email and password.");
      return;
    }

    const nextExpiry = Date.now() + SESSION_LENGTH;

    sessionStorage.setItem(SESSION_KEY, String(nextExpiry));
    setExpiresAt(nextExpiry);
    setPassword("");
    setError("");
  }

  if (expiresAt && expiresAt > Date.now()) {
    return children;
  }

  return (
    <main className="preview-login">
      <form className="preview-login-form" onSubmit={handleSubmit}>
        <h1>The Crescent Hotel</h1>
        <p className="preview-login-intro">
  Sign in to explore the website preview.
</p>

<p className="preview-login-note">
  The words, images, and videos are placeholders to give a general
  idea of the design. This site is my design playground—a space
  to try ideas, test layouts, and see what feels right for
  The Crescent Hotel.
</p>
        <label htmlFor="preview-email">Email</label>
        <input
          id="preview-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="preview-password">Password</label>
        <input
          id="preview-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">View preview</button>
      </form>
    </main>
  );
}