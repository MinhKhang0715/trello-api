import { columnRoutes } from "src/routes/v1/column.route";
import { BoardModel } from "../models/board.model";

const createNewBoard = async (data: any) => {
  try {
    const result = await BoardModel.createNewBoard(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getBoard = async (id: string) => {
  try {
    const board = await BoardModel.getBoard(id);
    if (!board || !board.columns)
      throw new Error('Board not found')

    // Add each card to its corrected column based on cardId
    board.columns.forEach(col => {
      col.cards = board.cards?.filter(c => c.columnId.toString() === col._id.toString());
    });
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNewBoard, getBoard };
