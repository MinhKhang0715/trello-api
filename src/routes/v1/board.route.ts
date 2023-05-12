import express from "express";
import { BoardController } from "../../controllers/board.controller";
import { BoardValidation } from "../../validations/board.validation";

const router = express.Router()

router.route('/')
  .post(BoardValidation.createNewBoard, BoardController.createNewBoard);

router.route('/:id')
  .get(BoardController.getBoard)
  .put(BoardValidation.updateBoard, BoardController.updateBoard);

export const boardRoutes = router;
