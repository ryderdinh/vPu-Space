import Joi from 'joi';
import { getDB } from '@/config/mongodb';
import { ObjectId } from 'mongodb';
import { ColumnModel } from './column.model';
import { CardModel } from './card.model';

// Define board collection
const boardCollectionName = 'boards';

const boardCollectionSchema = Joi.object({
	title: Joi.string().required().min(4).max(21).trim(),
	columnOrder: Joi.array().items(Joi.string()).default([]),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false)
});

const validateSchema = async data => {
	return await boardCollectionSchema.validateAsync(data, {
		abortEarly: false
	});
};

const createNew = async data => {
	try {
		const value = await validateSchema(data);
		const result = await getDB()
			.collection(boardCollectionName)
			.insertOne(value);
		return await getDB().collection(boardCollectionName).findOne({
			_id: result.insertedId
		});
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
	try {
		const result = await getDB()
			.collection(boardCollectionName)
			.findOneAndUpdate(
				{ _id: ObjectId(boardId) },
				{ $push: { columnOrder: columnId } },
				{
					returnDocument: 'after'
				}
			);
		return result.value;
	} catch (error) {
		throw new Error(error);
	}
};

const getFullBoard = async id => {
	try {
		const result = await getDB()
			.collection(boardCollectionName)
			.aggregate([
				{
					$match: {
						_id: ObjectId(id),
						_destroy: false
					}
				},
				// { $addFields: { _id: { $toString: "$_id" } } },
				{
					$lookup: {
						from: ColumnModel.collectionName, //collection to join
						localField: '_id', //field from the input documents
						foreignField: 'boardId', //field from the documents of the "from" collection
						as: 'columns' //array field
					}
				},
				{
					$lookup: {
						from: CardModel.collectionName, //collection to join
						localField: '_id', //field from the input documents
						foreignField: 'boardId', //field from the documents of the "from" collection
						as: 'cards' //array field
					}
				}
			])
			.toArray();
		return result[0] || {};
	} catch (error) {
		console.log(error);
	}
};

const deleteItem = async data => {
	try {
		const result = await getDB()
			.collection(boardCollectionName)
			.deleteMany(data);
		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

export const BoardModel = {
	createNew,
	deleteItem,
	getFullBoard,
	pushColumnOrder
};
