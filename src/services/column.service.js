import { ColumnModel } from "@/models/column.model";
import { BoardModel } from "../models/board.model";

const createNew = async (data) => {
  try {
    //? Transaction mongodb
    const newColumnData = await ColumnModel.createNew(data);

    //? Update column order
    await BoardModel.pushColumnOrder(
      newColumnData.boardId.toString(),
      newColumnData._id.toString()
    );

    return newColumnData;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result = await ColumnModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
