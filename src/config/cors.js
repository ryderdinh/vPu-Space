import { env } from './environtment';

const whitelist = ['https://vpuspace.pages.dev'];
export const corsOptions =
	env.SERVER_TYPE === 'DEV'
		? ''
		: {
				origin: function (origin, callback) {
					if (whitelist.indexOf(origin) !== -1) {
						callback(null, true);
					} else {
						callback(new Error(`${origin} not allowed by CORS`));
					}
				},
				optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
		  };
