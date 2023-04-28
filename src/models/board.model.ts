import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDBInstance } from "../config/mongodb";
import { PushOperator } from "mongodb";
import { Board } from "../config/interfaces";
import { ColumnModel } from './column.model'
import { CardModel } from "./card.model";

// Board collection structure
const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),     // title cannot be null and its length is between 3 and 20 characters
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

// {
//   $addFields: {
//     _id: { $toString: '$_id' } // convert _id to string for querrying
//   }
// },
const getBoard = async (id: string) => {
  try {
    const result = await getDBInstance().collection(boardCollectionName).aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $lookup: {
          from: ColumnModel.columnCollectionName,
          localField: '_id',        // column's id
          foreignField: 'boardId',  // boardId field in collumn collection
          as: 'columns'             // array of collums
        }
      },
      { $lookup: {
          from: CardModel.cardCollectionName,
          localField:  '_id',       // card's id
          foreignField: 'boardId',  // boardId field in card collection
          as: 'cards'               // array of cards
        }
      }
    ]).toArray();
    return result[0] as Board || {};
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Push into the columnOrder field when a new column is created
 * 
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId: string, columnId: string) => {
  try {
    const result = await getDBInstance().collection(boardCollectionName).findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $push: { columnOrder: columnId } } as PushOperator<Document>,
      { returnDocument: "after" }
    );
    return result;
  } catch(error) {
    throw new Error(error);
  }
}

export const BoardModel = { createNewBoard, getBoard, pushColumnOrder };
