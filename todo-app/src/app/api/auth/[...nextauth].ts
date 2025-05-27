
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials); // Debug log
        if (
          credentials?.username === "user1" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "user1",
            email: "user1@example.com",
            userId: "user1", // Used for todo filtering
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: undefined, // Remove the dedicated sign-in page; handle on home page
  },
  debug: true, // Enable debug logs to troubleshoot
};

export default NextAuth(authOptions);