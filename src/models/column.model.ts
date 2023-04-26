import Joi from "joi";
import { getDBInstance } from "../config/mongodb";

// Column collection structure

const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20), // title cannot be null and its length is between 3 and 20 characters
  cardOrder: Joi.array().items(Joi.string()).default([]), // is an array of strings, default value is an empty array
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.bool().default(false)
});

const validateSchema = async (data: any) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNewColumn = async (data: any) => {
  try {
    const value = await validateSchema(data);
    const result = await getDBInstance().collection(columnCollectionName).insertOne(value);
    const insertedDocument = await getDBInstance().collection(columnCollectionName).findOne(result.insertedId);
    return insertedDocument;
  } catch(error) {
    console.log(error);
    return null;
  }
}

export const ColumnModel = { createNewColumn }
