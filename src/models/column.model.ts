import Joi from "joi";
import { getDBInstance } from "../config/mongodb";
import { ObjectId } from "mongodb";

// Column collection structure

const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(), // title cannot be null and its length is between 3 and 20 characters
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
    throw new Error(error);
  }
}

const updateColumn = async (id: string, data: any) => {
  try {
    const result = await getDBInstance().collection(columnCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );
    return result.value;
  } catch(error) {
    throw new Error(error);
  }
}

export const ColumnModel = { createNewColumn, updateColumn }
