"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="text-bright-blue hover:underline"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("credentials")} // No redirect; form is on the home page
      className="text-bright-blue hover:underline"
    >
      Sign in
    </button>
  );
}