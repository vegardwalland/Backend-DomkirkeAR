import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || process.env.DEVDB_URI;
const dbName = process.env.MONGODB_URI ? 'heroku_3bp53ctw' : process.env.DEVDB_DB;
const sanitize = require('mongo-sanitize');
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

    // Sanitizes everything in the query and body
    req.query = sanitizeAll(req.query);
    req.body = sanitizeAll(req.body);

    return next();
}

function sanitizeAll(obj) {
    // Sanitizes everything in the object
    Object.keys(obj).forEach(param => {
            obj[param] = sanitize(obj[param])
    })

    return obj;
}

export default database;
