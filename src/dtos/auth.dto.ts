export interface RegisterRequestDto {
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  id: number;
  email: string;
  createdAt: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  id: number;
  email: string;
  createdAt: string;
}
