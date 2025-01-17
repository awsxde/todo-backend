import { Request, Response } from "express";
import {
  CreateTodoDto,
  DeleteTodoDto,
  ListTodoDto,
  UpdateTodoDto,
} from "../dtos/todo.dto";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todo.service";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title }: CreateTodoDto = {
      userId: req.userId!,
      title: req.body.title,
    };
    const todo = await createTodo(userId, title);

    res.status(201).json(todo);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId }: ListTodoDto = {
      userId: req.userId!,
    };
    const todos = await getTodos(userId);

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, completed, title }: UpdateTodoDto = req.body;
    const todo = await updateTodo(id, completed, title);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id }: DeleteTodoDto = { id: Number(req.query.id) };
    const todo = await deleteTodo(id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
