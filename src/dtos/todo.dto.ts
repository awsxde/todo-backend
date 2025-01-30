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

export interface ListTodoDto {
  userId: number;
}

export interface UpdateTodoDto {
  id: number;
  title: string;
  expiresAt?: Date;
  status?: string;
}

export interface DeleteTodoDto {
  id: number;
}
