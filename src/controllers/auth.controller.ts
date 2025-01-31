import { NextFunction, Request, Response } from "express";
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";
import catchAsync from "../utils/catch-async";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestDto: RegisterUserRequestDto = req.body;
    const user = await registerUser(requestDto.email, requestDto.password);
    const responseDto: RegisterUserResponseDto = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(201).json(responseDto);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  }
);
