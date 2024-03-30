import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodo);
// 여기서 id를 동적 세그먼트라고 한다 id 세그먼트
router.delete("/:id", deleteTodo);

export default router;
