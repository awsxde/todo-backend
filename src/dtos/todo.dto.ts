export interface CreateTodoDto {
  userId: number;
  title: string;
  expiresAt?: Date;
  status?: string;
}

export interface ListTodoDto {
  userId: number;
}

export interface UpdateTodoDto {
  id: number;
  completed: boolean;
  title: string;
  expiresAt?: Date;
  status?: string;
}

export interface DeleteTodoDto {
  id: number;
}
