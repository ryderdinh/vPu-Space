import Joi from 'joi';
import { HttpStatusCode } from '@/utilities/constants';

const createNew = async (req, res, next) => {
	const condition = Joi.object({
		boardId: Joi.string().required(),
		title: Joi.string().required().min(4).max(21).trim()
	});
	try {
		await condition.validateAsync(req.body, { abortEarly: false });
		next();
	} catch (error) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			errors: `column-validation: ${new Error(error).message}`
		});
	}
};

const update = async (req, res, next) => {
	const condition = Joi.object({
		title: Joi.string().min(4).max(21).trim()
	});
	try {
		await condition.validateAsync(req.body, {
			abortEarly: false,
			allowUnknown: true
		});
		next();
	} catch (error) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			errors: `column-validation: ${new Error(error).message}`
		});
	}
};

export const ColumnValidation = { createNew, update };
