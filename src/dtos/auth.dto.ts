export interface RegisterUserRequestDto {
  email: string;
  password: string;
}

export interface RegisterUserResponseDto {
  id: number;
  email: string;
  createdAt: Date;
}

export interface LoginUserRequestDto {
  email: string;
  password: string;
}

export interface LoginUserResponseDto {
  id: number;
  email: string;
  createdAt: string;
}
