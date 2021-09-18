import { ColumnModel } from '@/models/column.model';
import { BoardModel } from '@/models/board.model';
import { ObjectId } from 'mongodb';
import { CardModel } from '@/models/card.model';
const keysColumn = [
	'boardId',
	'_id',
	'cardOrder',
	'title',
	'createdAt',
	'updatedAt',
	'_destroy'
];

const createNew = async data => {
	try {
		//? Transaction mongodb
		const newColumnData = await ColumnModel.createNew(data);
		newColumnData.cards = [];
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
		const updateData = {
			...data,
			updatedAt: Date.now()
		};
		let listKeyData = Object.keys(updateData);
		for (const itm of listKeyData)
			if (!keysColumn.includes(itm)) {
				delete updateData[itm];
			}
		if (updateData._id) delete updateData._id;
		const result = await ColumnModel.update(id, updateData);
		if (result._destroy) {
			//delete many card in this column
			CardModel.deleteMany(result.cardOrder);
		}
		return result;
	} catch (error) {
		throw new Error(`column-service: ${error}`);
	}
};

export const ColumnService = { createNew, update };
