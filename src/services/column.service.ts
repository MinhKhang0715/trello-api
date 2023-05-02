import { ColumnModel } from "../models/column.model";
import { BoardModel } from "../models/board.model";
import { CardModel } from "../models/card.model"

const createNewColumn = async (data: any) => {
  try {
    const newColumn = await ColumnModel.createNewColumn(data);
    if (newColumn) {
      // add cards property to newColumn and assign an empty array to it
      newColumn.cards = [];

      // update columOrder array in board collection
      await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString());

      return newColumn;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

const updateColumn = async (id: string, data: any) => {
  try {
    const updatedData = {
      ...data,
      updatedAt: Date.now()
    };
    if (updatedData._id) delete updatedData._id;
    if (updatedData.cards) delete updatedData.cards;
    const result = await ColumnModel.updateColumn(id, updatedData);
    if (result && result._destroy) {
      CardModel.deleteMany(result.cardOrder);
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNewColumn, updateColumn };
