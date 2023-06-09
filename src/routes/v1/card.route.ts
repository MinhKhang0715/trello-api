import express from "express";
import { CardController } from "../../controllers/card.controller";
import { CardValidation } from "../../validations/card.validation";

const router = express.Router()

router.route('/')
  .post(CardValidation.createNewCard, CardController.createNewCard);

router.route('/:id')
  .put(CardValidation.updateCard, CardController.updateCard);

export const cardRoutes = router;
