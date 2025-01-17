import { prisma } from "../utils/prismaClient";

export const createTodo = async (
  userId: number,
  title: string,
  expiresAt?: Date,
  status?: string
) => {
  return await prisma.todo.create({
    data: { title, userId, expiresAt, status: status ?? "pending" },
  });
};

export const getTodos = async (userId: number) => {
  return await prisma.todo.findMany({ where: { userId } });
};

export const updateTodo = async (
  todoId: number,
  completed: boolean,
  title: string,
  expiresAt?: Date,
  status?: string
) => {
  return await prisma.todo.update({
    where: { id: todoId },
    data: { title, completed, expiresAt, status },
  });
};

export const deleteTodo = async (todoId: number) => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};
