import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utilities/constants";


const createNewColumn = async (req: Request, res: Response, next: NextFunction) => {
	const condition = Joi.object({
		boardId: Joi.string().required(),
		title: Joi.string().required().min(3).max(20).trim(), // title cannot be null and its length is between 3 and 20 characters
	});

	try {
		await condition.validateAsync(req.body, { abortEarly: false });
		next();
	} catch (error) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			errors: new Error(error).message
		});
	}
};

const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
	const condition = Joi.object({
		title: Joi.string().min(3).max(20).trim() // title cannot be null and its length is between 3 and 20 characters
	});

	try {
		await condition.validateAsync(req.body, {
			abortEarly: false,
			allowUnknown: true
		});
		next();
	} catch (error) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			errors: new Error(error).message
		});
	}
};

export const ColumnValidation = { createNewColumn, updateColumn }
