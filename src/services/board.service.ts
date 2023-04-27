import { BoardModel } from "../models/board.model";

const createNewBoard = async (data: any) => {
  try {
    const result = await BoardModel.createNewBoard(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNewBoard };
