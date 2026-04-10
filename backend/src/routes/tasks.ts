import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";
import { validateCreate, validateUpdate } from "../middleware/validate";

const router = Router();

router.get("/", getTasks);
router.post("/", validateCreate, createTask);
router.patch("/:id", validateUpdate, updateTask);
router.delete("/:id", deleteTask);

export default router;
