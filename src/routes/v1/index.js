import express from "express";
import { HttpStatusCode } from "@/utilities/constants";
import { BoardRoutes } from "./board.route";
import { ColumnRoutes } from "./column.route";
import { CardRoutes } from "./card.route";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "200 OK" })
);

/** Board APIs */
router.use("/boards", BoardRoutes);

/** Column APIs */
router.use("/columns", ColumnRoutes);

/** Column APIs */
router.use("/cards", CardRoutes);

export const apiV1 = router;
