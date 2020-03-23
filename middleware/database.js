import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const url = process.env.MONGODB_URI;
const dbName = 'arStavanger';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    if (!client.isConnected()) {
        await client.connect();
    }

    req.dbClient = client;
    req.db = client.db(dbName);

    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;