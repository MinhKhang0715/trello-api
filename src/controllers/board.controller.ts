import { Request, Response } from "express"
import { BoardService } from "../services/board.service";
import { HttpStatusCode } from "../utilities/constants";

const createNewBoard = async (req: Request, res: Response) => {
	try {
		const result = await BoardService.createNewBoard(req.body);
		res.status(HttpStatusCode.OK).json(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			errors: error.message
		});
	}
};

export const BoardController = { createNewBoard };
