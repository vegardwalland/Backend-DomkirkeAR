import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';


const jwtSecret = process.env.JWT_SECRET;



export function checkLogin() { 
    let loggedIn = false;
    if(jwt.decode(cookie.get("token"), jwtSecret) != null){
        loggedIn = true;
        //Check if the token is expired
        const decoded = jwt.decode(cookie.get("token"), jwtSecret);
        if(decoded.exp < Date.now().valueOf() /1000) {
          loggedIn = false;
        }
      }
    return loggedIn;
}

export function getTokenData() {
  if(checkLogin()) {
    return jwt.decode(cookie.get("token"), jwtSecret);
  }
  return null;
}

export function findUser(db, email, callback) {
  const collection = db.collection('users');
  collection.findOne({email}, callback);
}


