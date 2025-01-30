export interface RegisterRequestDto {
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  id: number;
  email: string;
  createdAt: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
