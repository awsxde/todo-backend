import { Request, Response } from "express";
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from "../dtos/todo.dto";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todo.service";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const { title } = req.body;
    const createTodoDto: CreateTodoDto = { userId, title };
    const todo = await createTodo(createTodoDto.userId, createTodoDto.title);

    res.status(201).json(todo);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const todos = await getTodos(userId);
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, completed, title } = req.body;
    const updateTodoDto: UpdateTodoDto = { id, completed, title };
    const todo = await updateTodo(
      updateTodoDto.id,
      updateTodoDto.completed,
      updateTodoDto.title
    );

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.query.id);
    const deleteTodoDto: DeleteTodoDto = { id };
    const todo = await deleteTodo(deleteTodoDto.id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
