import { CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";

const createNewCard = async (data: any) => {
  try {
    const newCard = await CardModel.createNewCard(data);

    newCard &&
      await ColumnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString());

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCard = async (id: string, data: any) => {
  try {
    const updatedData = {
      ...data,
      updatedAt: Date.now()
    };
    if (updatedData._id) delete updatedData._id;
    const result = await CardModel.updateCard(id, updatedData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNewCard, updateCard };
