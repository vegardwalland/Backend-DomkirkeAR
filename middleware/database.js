import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || process.env.DEVDB_URI;
const dbName = process.env.MONGODB_URI ? 'heroku_3bp53ctw' : process.env.DEVDB_DB;

const client = new MongoClient(uri, {
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

export default database;
