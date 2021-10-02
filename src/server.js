import express from 'express';
import cors from 'cors';
import { corsOptions } from '@/config/cors';
import { env } from '@/config/environtment';
import { connectDB } from '@/config/mongodb';
import { apiV1 } from '@/routes/v1/index';

const port = env.APP_PORT;
const host = `http://localhost:${port}`;

//? DATABASE
connectDB()
	.then(() => {
		console.clear();
		console.log('[🌀]  Database');
	})
	.then(() => bootServer())
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

const bootServer = () => {
	const app = express();
	// Allow cors
	app.use(cors(corsOptions));
	//? Enable req.body data
	app.use(express.json());

	//? ROUTER
	app.use('/v1', apiV1);

	//? CONNECT TO PORT
	app.listen(port, () => {
		console.log('[🌀]  Server: @vpuspace');
		console.log('    ◽' + host);
		console.log('    ◽' + 'ctrl+click to open');
	});
};
