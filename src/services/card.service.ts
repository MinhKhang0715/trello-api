import { CardModel } from "../models/card.model";

const createNewCard = async (data: any) => {
  try {
    const result = await CardModel.createNewCard(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNewCard };
