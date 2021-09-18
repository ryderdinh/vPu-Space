import { MongoClient } from 'mongodb';
import { env } from './environtment';

const uri = env.MONGODB_URI;
let dbInstance = null;

export const connectDB = async () => {
	const client = new MongoClient(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	//TODO: Connect to the server
	await client.connect();

	//TODO: Assign clientDB to our dbInstance
	dbInstance = client.db(env.DATABASE_NAME);
};

//? Get database instance
export const getDB = () => {
	if (!dbInstance) throw new Error('No database instance');
	return dbInstance;
};
