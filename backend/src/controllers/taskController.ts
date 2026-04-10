import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateTaskBody, UpdateTaskBody } from "../types/task";

const prisma = new PrismaClient();

export async function getTasks(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ data, message: "Tasks fetched successfully" });
  } catch (e) { next(e); }
}

export async function createTask(req: Request<{}, {}, CreateTaskBody>, res: Response, next: NextFunction) {
  try {
    const data = await prisma.task.create({
      data: { title: req.body.title.trim(), description: req.body.description },
    });
    res.status(201).json({ data, message: "Task created successfully" });
  } catch (e) { next(e); }
}

export async function updateTask(req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) { res.status(404).json({ error: "Task not found" }); return; }

    const data = await prisma.task.update({
      where: { id },
      data: {
        ...(req.body.title !== undefined && { title: req.body.title.trim() }),
        ...(req.body.completed !== undefined && { completed: req.body.completed }),
      },
    });
    res.json({ data, message: "Task updated successfully" });
  } catch (e) { next(e); }
}

export async function deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) { res.status(404).json({ error: "Task not found" }); return; }

    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted successfully" });
  } catch (e) { next(e); }
}
