import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { z } from "zod";
import { userType } from "../types";

// Define the validation schema
const authSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().min(1).max(100).email(),
  password: z.string().min(8),
});

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    name: { label: "Name", type: "text", optional: true },
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
        name?: string;
        email:string;
        password: string;
      };
    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.error("Invalid credentials input:", error);
      return null;
    }

    const { name, email, password } = validatedCredentials;

    try {

      const loginResponse = await fetch("http://localhost8000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });  
      if (loginResponse) {
        const user:userType = await loginResponse.json();
        const isValidPassword = await bcrypt.compare(password, user.password as string);
        if (!isValidPassword) {
          console.error("Invalid password");
          return null;
        }

        return {
          id: user._id,
          name: user.username,
          email: user.email,
        };
      }

      if (name) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerResponse = await fetch("http://localhost8000/api/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            email,
            password: hashedPassword,
            address: "",
            phone: "",
          }),
        });

        if (registerResponse.ok) {
          const newUser = await registerResponse.json();
          return {
            id: newUser._id,
            name: newUser.username,
            email: newUser.email,
          };
        } else {
          console.error("Failed to register user.");
          return null;
        }
      } else {
        console.error("Name is required for registration.");
        return null;
      }
    } catch (error) {
      console.error("Authorization error:", error);
      return null;
    }
  },
});
