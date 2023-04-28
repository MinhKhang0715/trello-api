import express from "express";
import { ColumnController } from "../../controllers/column.controller";
import { ColumnValidation } from "../../validations/column.validation";

const router = express.Router()

router.route('/')
  .post(ColumnValidation.createNewColumn, ColumnController.createNewColumn);

router.route('/:id')
  .put(ColumnValidation.updateColumn, ColumnController.updateColumn);

export const columnRoutes = router;
