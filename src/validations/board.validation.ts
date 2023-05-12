import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utilities/constants";


const createNewBoard = async (req: Request, res: Response, next: NextFunction) => {
	const condition = Joi.object({
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

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
	const condition = Joi.object({
		title: Joi.string().required().min(3).max(20).trim(), // validate that title cannot be null and its length is between 3 and 20 characters
		columnOrder: Joi.array().items(Joi.string()) // validate that columnOrder is an array of string
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

export const BoardValidation = { createNewBoard, updateBoard }
