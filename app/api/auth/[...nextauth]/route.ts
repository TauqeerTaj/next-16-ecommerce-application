import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// Debug environment variables
console.log(
  "Google Client ID:",
  process.env.GOOGLE_CLIENT_ID ? "Found" : "Not found"
);
console.log(
  "Google Client Secret:",
  process.env.GOOGLE_CLIENT_SECRET ? "Found" : "Not found"
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        emailOrPhone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrPhone || !credentials?.password) {
          console.log("Missing credentials:", credentials);
          return null;
        }

        try {
          await connectDB();

          const { name, emailOrPhone, password } = credentials;

          console.log("Auth attempt:", { name, emailOrPhone });

          // Check if input is email or phone
          const isEmail = emailOrPhone.includes("@");
          const email = isEmail ? emailOrPhone.toLowerCase() : undefined;
          const phone = isEmail ? undefined : emailOrPhone;

          console.log("Input emailOrPhone:", emailOrPhone);
          console.log("Processed email:", email);
          console.log("Processed phone:", phone);

          // Find user by email or phone (direct query to avoid issues)
          let user = null;
          if (email) {
            user = await User.findOne({ email: email }).select("+password");
          } else if (phone) {
            user = await User.findOne({ phone: phone }).select("+password");
          }

          console.log("User found:", user ? "yes" : "no");
          console.log("Name provided:", name ? "yes" : "no");
          console.log("Search query:", { email, phone });
          console.log(
            "Found user:",
            user ? JSON.stringify(user.email) : "null"
          );

          // If user exists and no name is provided, this is a login attempt
          if (user && (!name || name === "")) {
            console.log("Login attempt - checking password");

            // Check if password is hashed
            const isHashedPassword = user.password.startsWith("$2");
            console.log("Password is hashed:", isHashedPassword);

            let isPasswordValid = false;

            if (isHashedPassword) {
              // Compare with hashed password
              isPasswordValid = await bcrypt.compare(password, user.password);
            } else {
              // Compare plain text password (for manually created users)
              isPasswordValid = password === user.password;

              // Hash plain text password for future use
              if (isPasswordValid) {
                const salt = await bcrypt.genSalt(12);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
              }
            }

            console.log("Password valid:", isPasswordValid);

            if (!isPasswordValid) {
              console.log("Invalid password");
              return null;
            }

            console.log("Login successful!");
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              phone: user.phone,
            };
          }

          // If user doesn't exist and name is provided, this is a signup attempt
          if (!user && name) {
            console.log("Signup attempt - creating new user");

            // Create new user
            const newUser = new User({
              name,
              email,
              phone,
              password: password,
            });

            await newUser.save();
            console.log("New user created:", newUser._id);

            return {
              id: newUser._id.toString(),
              name: newUser.name,
              email: newUser.email,
              phone: newUser.phone,
            };
          }

          // If user exists and name is provided - user already exists error
          if (user && name) {
            console.log("User already exists");
            return null;
          }

          // If user doesn't exist and no name provided - login attempt without existing user
          if (!user && !name) {
            console.log("User not found for login");
            return null;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        // Handle Google sign-in
        try {
          await connectDB();

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user from Google data
            const newUser = new User({
              name: user.name,
              email: user.email,
              phone: null,
              password: null, // Google users don't have passwords
              googleId: user.id, // Store Google user ID
            });

            await newUser.save();
            console.log("Google user created:", newUser._id);
          }
        } catch (error) {
          console.error("Google auth error:", error);
        }
      }

      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
