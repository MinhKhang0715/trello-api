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

const updateBoard = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = BoardService.updateBoard(id, req.body);
		res.status(HttpStatusCode.OK).json(result);
		
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			message: error.message
		})
	}
};

const getBoard = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await BoardService.getBoard(id);
		res.status(HttpStatusCode.OK).json(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			errors: error.message
		});
	}
};

export const BoardController = { createNewBoard, getBoard, updateBoard };
