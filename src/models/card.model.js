import Joi from "joi";
import { getDB } from "@/config/mongodb";
import { Db } from "mongodb";
// Define card collection

const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(4).max(21),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});
const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);
    return await getDB().collection(cardCollectionName).findOne({
      _id: result.insertedId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CardModel = { createNew };
