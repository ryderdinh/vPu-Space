import { ColumnModel } from '@/models/column.model';
import { BoardModel } from '@/models/board.model';
import { CardModel } from '@/models/card.model';

const keysColumn = ['boardId', 'cardOrder', 'title', 'updatedAt', '_destroy'];

const createNew = async data => {
	try {
		// Transaction mongodb
		const newColumnData = await ColumnModel.createNew(data);
		newColumnData.cards = [];
		// Update column order
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
		let listKeyData = Object.keys(updateData);
		// Remove unnecessary keys (Ex remove: _id)
		for (const keyItem of listKeyData) {
			if (!keysColumn.includes(keyItem)) {
				delete updateData[keyItem];
			}
		}
		const result = await ColumnModel.update(id, updateData);
		if (result._destroy) {
			// Delete many card in this column
			CardModel.deleteMany(result.cardOrder);
		}

		return result;
	} catch (error) {
		throw new Error(`column-service: ${error}`);
	}
};

export const ColumnService = { createNew, update };
