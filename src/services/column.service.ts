import { ColumnModel } from "../models/column.model";
import { BoardModel } from "../models/board.model";

const createNewColumn = async (data: any) => {
  try {
    const newColumn = await ColumnModel.createNewColumn(data);

    // update columOrder array in board collection
    newColumn &&
      await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString());

    return newColumn;
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
    const result = await ColumnModel.updateColumn(id, updatedData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNewColumn, updateColumn };
