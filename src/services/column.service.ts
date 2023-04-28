import { ColumnModel } from "../models/column.model";

const createNewColumn = async (data: any) => {
  try {
    const result = await ColumnModel.createNewColumn(data);
    return result;
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
