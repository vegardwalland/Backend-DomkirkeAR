import { session } from "next-session";

async function session(req, res, next) {

    req.dbClient = client;
    req.db = client.db(dbName);

    return next();
}

export default session;
