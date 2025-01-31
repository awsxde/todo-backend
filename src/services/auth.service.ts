import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import passport from "passport";
import { createError } from "../utils/create-error";
import { prisma } from "../utils/prisma-client.utils";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw createError("User already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return user;
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "local",
      async (
        err: Error | null,
        user: User | false,
        info: { message: string }
      ) => {
        if (err) return reject(err);
        if (!user)
          return reject(
            createError(info.message || "Invalid credentials", 401)
          );

        resolve(user);
      }
    )({ body: { email, password } } as unknown as Request);
  });
};
