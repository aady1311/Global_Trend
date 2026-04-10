import { Request, Response, NextFunction } from "express";

export function validateCreate(req: Request, res: Response, next: NextFunction) {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0 || title.length > 255) {
    res.status(400).json({ error: "Validation failed", details: "Title is required and must not be empty" });
    return;
  }
  next();
}

export function validateUpdate(req: Request, res: Response, next: NextFunction) {
  const { title, completed } = req.body;
  if (title === undefined && completed === undefined) {
    res.status(400).json({ error: "Validation failed", details: "At least one field (title or completed) must be provided" });
    return;
  }
  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0 || title.length > 255)) {
    res.status(400).json({ error: "Validation failed", details: "Title must be a non-empty string, max 255 chars" });
    return;
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    res.status(400).json({ error: "Validation failed", details: "completed must be a boolean" });
    return;
  }
  next();
}
