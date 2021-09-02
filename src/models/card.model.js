import Joi from "joi";
import { getDB } from "@/config/mongodb";
import { ObjectId } from "mongodb";

// Define card collection
const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(4).max(21).trim(),
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
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        {
          returnDocument: "after",
        }
      );
    console.log(result);
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = { createNew, update };
