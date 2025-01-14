import { prisma } from "../utils/prismaClient";

export const createTodo = async (userId: number, title: string) => {
  return await prisma.todo.create({
    data: { title, userId },
  });
};

export const getTodos = async (userId: number) => {
  return await prisma.todo.findMany({ where: { userId } });
};

export const updateTodo = async (
  todoId: number,
  userId: number,
  completed: boolean,
  title: string
) => {
  return await prisma.todo.update({
    where: { id: todoId },
    data: { title, completed },
  });
};

export const deleteTodo = async (todoId: number, userId: number) => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};
