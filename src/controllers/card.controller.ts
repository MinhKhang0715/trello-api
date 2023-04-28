import { Request, Response } from "express"
import { CardService } from "../services/card.service";
import { HttpStatusCode } from "../utilities/constants";

const createNewCard = async (req: Request, res: Response) => {
	try {
		const result = await CardService.createNewCard(req.body);
		res.status(HttpStatusCode.OK).json(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			errors: error.message
		});
	}
};

export const CardController = { createNewCard };
