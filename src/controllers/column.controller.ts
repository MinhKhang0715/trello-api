import { Request, Response } from "express"
import { ColumnService } from "../services/column.service";
import { HttpStatusCode } from "../utilities/constants";

const createNewColumn = async (req: Request, res: Response) => {
	try {
		const result = await ColumnService.createNewColumn(req.body);
		res.status(HttpStatusCode.OK).json(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			errors: error.message
		});
	}
};

const updateColumn = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		console.log(id);
		const result = await ColumnService.updateColumn(id, req.body);
		res.status(HttpStatusCode.OK).json(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			errors: error.message
		});
	}
};

export const ColumnController = { createNewColumn, updateColumn };
