"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-very-light-gray dark:bg-very-dark-blue">
      <div className="bg-white dark:bg-very-dark-desaturated-blue p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-very-dark-grayish-blue dark:text-dark-light-grayish-blue mb-4 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 rounded text-very-dark-grayish-blue dark:text-dark-light-grayish-blue bg-transparent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2 rounded text-very-dark-grayish-blue dark:text-dark-light-grayish-blue bg-transparent"
          />
          <button
            type="submit"
            className="w-full bg-bright-blue text-white p-2 rounded hover:bg-opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}