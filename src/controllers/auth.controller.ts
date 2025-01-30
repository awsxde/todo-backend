import { NextFunction, Request, Response } from "express";
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";
import logger from "../utils/logger.utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requestDto: RegisterUserRequestDto = req.body;
    const user = await registerUser(requestDto.email, requestDto.password);
    const responseDto: RegisterUserResponseDto = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(201).json(responseDto);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
    logger.error(`Register Failed: ${(error as Error).message}`);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requestDto: LoginUserRequestDto = req.body;
    const user = await loginUser(requestDto.email, requestDto.password);
    const responseDto: LoginUserResponseDto = {
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
