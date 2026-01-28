"use client";

import { useState } from "react";
// import { loginWithGoogle, logout } from "@/app/models/auth";
import { auth } from "@/app/models/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      alert(err?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Login</h1>

      {!user ? (
        <button onClick={handleLogin}>Continue with Google</button>
      ) : (
        <>
          <p>Logged in as: {user.email}</p>
          <img
            src={user.photoURL || ""}
            alt="profile"
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
          <div style={{ marginTop: 12 }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
}
