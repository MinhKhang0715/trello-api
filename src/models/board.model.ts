import Joi from "joi";
import { getDBInstance } from "../config/mongodb";

// Board collection structure

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(), // title cannot be null and its length is between 3 and 20 characters
  columnOrder: Joi.array().items(Joi.string()).default([]), // is an array of strings, default value is an empty array
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.bool().default(false)
});

const validateSchema = async (data: any) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNewBoard = async (data: any) => {
  try {
    const value = await validateSchema(data);
    const result = await getDBInstance().collection(boardCollectionName).insertOne(value);
    const insertedDocument = await getDBInstance().collection(boardCollectionName).findOne(result.insertedId);
    return insertedDocument;
  } catch(error) {
    throw new Error(error);
  }
}

export const BoardModel = { createNewBoard }
