export interface CreateTodoRequestDto {
  userId: number;
  title: string;
  expiresAt?: Date;
  status?: string;
}

export interface CreateTodoResponseDto {
  id: number;
  title: string;
  userId: number;
  expiresAt: Date | null;
  status: string | null;
}

export interface ListTodoRequestDto {
  userId: number;
}

export type ListTodoResponseDto = CreateTodoResponseDto[];

export type UpdateTodoRequestDto = {
  id: number;
  title: string;
  expiresAt?: Date;
  status?: string;
};

export type UpdateTodoResponseDto = CreateTodoResponseDto;

export interface DeleteTodoRequestDto {
  id: number;
}
