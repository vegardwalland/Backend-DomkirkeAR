import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const url = process.env.MONGODB_URI;
const dbName = 'heroku_3bp53ctw';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    if (!client.isConnected()) {
        console.log("DB not connected. Connecting...");
        await client.connect();
        console.log("DB connected.");
    }

    req.dbClient = client;
    req.db = client.db(dbName);

    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
