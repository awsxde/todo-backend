export interface CreateTodoDto {
  userId: number;
  title: string;
}

export interface ListTodoDto {
  userId: number;
}

export interface UpdateTodoDto {
  id: number;
  completed: boolean;
  title: string;
}

export interface DeleteTodoDto {
  id: number;
}
