import { BoardModel } from "../models/board.model";
import { Board } from "src/config/interfaces";

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

    const clonedBoard = JSON.parse(JSON.stringify(board)) as Board;
    clonedBoard.columns = clonedBoard.columns.filter(col => !col._destroy);

    // Add each card to its corrected column based on cardId    
    clonedBoard.columns.forEach(col => 
      col.cards = clonedBoard.cards?.filter(c => c.columnId.toString() === col._id.toString())
    );
    delete clonedBoard.cards;

    return clonedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNewBoard, getBoard };
