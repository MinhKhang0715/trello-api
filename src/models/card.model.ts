import Joi from "joi";
import { getDBInstance } from "../config/mongodb";
import { ObjectId } from "mongodb";

// Card collection structure

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(50).trim(), // title cannot be null and its length is between 3 and 20 characters
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
    const validatedData = await validateSchema(data);
    const dataToInsert = {
      ...validatedData,
      boardId: new ObjectId(validatedData.boardId),
      columnId: new ObjectId(validatedData.columnId)
    }
    const result = await getDBInstance().collection(cardCollectionName).insertOne(dataToInsert);
    const insertedDocument = await getDBInstance().collection(cardCollectionName).findOne(result.insertedId);
    return insertedDocument;
  } catch (error) {
    throw new Error(error);
  }
}

const updateCard = async (id: string, data: any) => {
  try {
    const dataToUpdate = { ...data };
    if (data.boardId) dataToUpdate.boardId = new ObjectId(data.boardId);
    if (data.columnId) dataToUpdate.columnId = new ObjectId(data.columnId);

    const result = await getDBInstance().collection(cardCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: dataToUpdate },
      { returnDocument: "after" }
    );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteMany = async (ids: string[]) => {
  try {
    const mongoIds = ids.map(i => new ObjectId(i));
    const result = await getDBInstance().collection(cardCollectionName).updateMany(
      { _id: { $in: mongoIds } },
      { $set: { _destroy: true } }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export const CardModel = { createNewCard, cardCollectionName, deleteMany, updateCard };
