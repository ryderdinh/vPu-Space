import { CardModel } from '@/models/card.model';
import { ColumnModel } from '../models/column.model';

const keysCard = [
	'boardId',
	'columnId',
	'title',
	'cover',
	'updatedAt',
	'_destroy'
];

const createNew = async data => {
	try {
		//? Transaction mongodb
		const newCardData = await CardModel.createNew(data);

		//? Update card order
		await ColumnModel.pushCardOrder(
			newCardData.columnId.toString(),
			newCardData._id.toString()
		);

		return newCardData;
	} catch (error) {
		throw new Error(error);
	}
};

const update = async (id, data) => {
	try {
		const updateData = { ...data, updatedAt: Date.now() };
		let listKeyData = Object.keys(updateData);
		// Remove unnecessary keys (Ex remove: _id)
		for (const keyItem of listKeyData) {
			if (!keysCard.includes(keyItem)) {
				delete updateData[keyItem];
			}
		}
		const result = await CardModel.update(id, updateData);

		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export const CardService = { createNew, update };
