import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("11223344", 12);
const result = await bcrypt.compare("11223344", hash);
console.log("resultsss", result);

const handler = NextAuth({
  providers: [
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

          // Find user by email or phone
          const user = await User.findOne({
            $or: [{ email: email }, { phone: phone }],
          }).select("+password");

          console.log("User found:", user ? "yes" : "no");

          // If user exists and name is provided, this is a login attempt
          if (user && !name) {
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

            // Hash password
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

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
    async jwt({ token, user }) {
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
