import Joi from "joi";
import { getDBInstance } from "../config/mongodb";
import { ObjectId, PushOperator } from "mongodb";

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
    const validatedData = await validateSchema(data);
    const dataToInsert = {
      ...validatedData,
      boardId: new ObjectId(validatedData.boardId)
    }
    const result = await getDBInstance().collection(columnCollectionName).insertOne(dataToInsert);
    const insertedDocument = await getDBInstance().collection(columnCollectionName).findOne(result.insertedId);
    return insertedDocument;
  } catch (error) {
    throw new Error(error);
  }
}

const updateColumn = async (id: string, data: any) => {
  try {
    const dataToUpdate = {
      ...data,
      boardId: new ObjectId(data.boardId)
    }
    const result = await getDBInstance().collection(columnCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: dataToUpdate },
      { returnDocument: "after" }
    );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Push into the cardOrder field when a new card is created
 * 
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId: string, cardId: string) => {
  try {
    const result = await getDBInstance().collection(columnCollectionName).findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $push: { cardOrder: cardId } } as PushOperator<Document>,
      { returnDocument: "after" }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export const ColumnModel = { createNewColumn, updateColumn, pushCardOrder, columnCollectionName }
