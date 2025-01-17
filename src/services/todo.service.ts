import { prisma } from "../utils/prisma-client.utils";

export const createTodo = async (
  userId: number,
  title: string,
  expiresAt?: Date,
  status?: string
) => {
  return await prisma.todo.create({
    data: { title, userId, expiresAt, status: status || "pending" },
  });
};

export const getTodos = async (userId: number) => {
  return await prisma.todo.findMany({ where: { userId } });
};

export const updateTodo = async (
  todoId: number,
  title: string,
  expiresAt?: Date,
  status?: string
) => {
  return await prisma.todo.update({
    where: { id: todoId },
    data: { title, expiresAt, status },
  });
};

export const deleteTodo = async (todoId: number) => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};
