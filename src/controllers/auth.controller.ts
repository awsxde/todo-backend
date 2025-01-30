import { NextFunction, Request, Response } from "express";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestDto: RegisterRequestDto = req.body;
    const user = await registerUser(requestDto.email, requestDto.password);
    const responseDto: RegisterResponseDto = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };

    res.status(201).json(responseDto);
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
    const requestDto: LoginRequestDto = req.body;
    const user = await loginUser(requestDto.email, requestDto.password);
    const responseDto: LoginResponseDto = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };

    req.logIn(user, async (loginErr) => {
      if (loginErr) return next(loginErr);
      res.status(200).json(responseDto);
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};
