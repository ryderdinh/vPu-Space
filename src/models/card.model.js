import Joi from 'joi';
import { getDB } from '@/config/mongodb';
import { ObjectId } from 'mongodb';

// Define card collection
const collectionName = 'cards';

const cardCollectionSchema = Joi.object({
	boardId: Joi.string().required(),
	columnId: Joi.string().required(),
	title: Joi.string().required().min(4).max(50).trim(),
	cover: Joi.string().default(null),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false)
});

const validateSchema = async data => {
	return await cardCollectionSchema.validateAsync(data, {
		abortEarly: false
	});
};

const createNew = async data => {
	try {
		const validatedValue = await validateSchema(data);
		const insertValue = {
			...validatedValue,
			boardId: ObjectId(validatedValue.boardId),
			columnId: ObjectId(validatedValue.columnId)
		};
		const result = await getDB()
			.collection(collectionName)
			.insertOne(insertValue);
		return await getDB().collection(collectionName).findOne({
			_id: result.insertedId
		});
	} catch (error) {
		throw new Error(error);
	}
};

const update = async (id, data) => {
	try {
		const result = await getDB()
			.collection(collectionName)
			.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: data },
				{ returnDocument: 'after' }
			);
		return result.value;
	} catch (error) {
		throw new Error(error);
	}
};
/**
 *
 * @param {Array of string card id} ids
 */
const deleteMany = async ids => {
	try {
		const transformIds = ids.map(item => ObjectId(item));
		const result = await getDB()
			.collection(collectionName)
			.updateMany(
				{ _id: { $in: transformIds } },
				{ $set: { _destroy: true } }
			);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export const CardModel = {
	collectionName,
	createNew,
	update,
	deleteMany
};
