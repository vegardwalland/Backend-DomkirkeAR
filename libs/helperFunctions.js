import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export function isLoggedIn() {
    let loggedIn = false;

    const decodedToken = getDecodedToken();
    if (decodedToken != null)
        loggedIn = !isTokenExpired(decodedToken);

    return loggedIn;
}

function getDecodedToken() {
    return jwt.decode(cookie.get("token"), jwtSecret);
}

function isTokenExpired(decodedToken) {
    return decodedToken.exp < Date.now().valueOf() / 1000;
}

export function getTokenData() {
    if (isLoggedIn()) {
        return getDecodedToken();
    }
    return null;
}

export function findUser(db, email, callback) {
    const collection = db.collection('users');
    collection.findOne({email}, callback);
}

export function isEmpty(obj) {
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    return Object.keys(obj).length === 0 && obj.constructor === Object
}
