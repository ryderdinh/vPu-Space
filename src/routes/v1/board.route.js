import { Router } from "express";
import { BoardController } from "@/controllers/board.controller";
import { BoardValidation } from "@/validations/board.validation";

const router = Router();

router.route("/").post(BoardValidation.createNew, BoardController.createNew);

router.route("/:id").get(BoardController.getFullBoard);

export const BoardRoutes = router;
