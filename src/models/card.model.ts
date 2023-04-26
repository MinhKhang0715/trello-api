import Joi from "joi";
import { getDBInstance } from "../config/mongodb";

// Card collection structure

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20), // title cannot be null and its length is between 3 and 20 characters
  cover: Joi.string().default(null), // is an array of strings, default value is an empty array
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.bool().default(false)
});

const validateSchema = async (data: any) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNewCard = async (data: any) => {
  try {
    const value = await validateSchema(data);
    const result = await getDBInstance().collection(cardCollectionName).insertOne(value);
    const insertedDocument = await getDBInstance().collection(cardCollectionName).findOne(result.insertedId);
    return insertedDocument;
  } catch(error) {
    console.log(error);
    return null;
  }
}

export const CardModel = { createNewCard }
