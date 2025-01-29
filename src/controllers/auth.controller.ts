import { NextFunction, Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: RegisterUserDto = req.body;
    const user = await registerUser(email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password }: LoginUserDto = req.body;
    const user = await loginUser(email, password);

    req.logIn(user, async (loginErr) => {
      if (loginErr) return next(loginErr);
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
