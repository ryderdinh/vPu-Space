import { Router } from "express";
import { BoardController } from "@/controllers/board.controller";
import { BoardValidation } from "@/validations/board.validation";

const router = Router();

router
  .route("/")
  .get(BoardController.createNew)
  .post(BoardValidation.createNew, BoardController.createNew);

export const BoardRoutes = router;
