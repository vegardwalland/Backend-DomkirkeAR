import assert from 'assert';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const dbCollectionName = 'users';
const loginErrorMessage = "Innlogging mislykkes";
const jwtSecret = process.env.JWT_SECRET;

function findUser(db, email, callback) {
  const collection = db.collection(dbCollectionName);
  collection.findOne({email}, callback);
}

function authUser(db, email, password, hash, callback) {
  const collection = db.collection(dbCollectionName);
  try {
    argon2
      .verify(hash, password)
        .then(callback);
  } catch (err) {
      throw err;
  }
}

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    assert.notEqual(null, req.body.email, 'Email må fylles ut');
    assert.notEqual(null, req.body.password, 'Passord må fylles ut');
    assert.notEqual("", req.body.email, 'Email må fylles ut');
    assert.notEqual("", req.body.password, 'Passord må fylles ut');
  } catch (bodyError) {
    res.status(403).json({error: true, message: bodyError.message});
    return;
  }

  const db = req.db;
  const email = req.body.email;
  const password = req.body.password;

  findUser(db, email, function(err, user) {
    if (err) {
      res.status(500).json({error: true, message: loginErrorMessage});
      return;
    }
    // If user is not found return 404
    if (!user) {
      res.status(404).json({error: true, message: loginErrorMessage});
      return;
    } else { // If user is found in db, try to authenticate.
      authUser(db, email, password, user.password, function(match) {
        if (!match) { // Return error if passwords don't match
          res.status(500).json({error: true, message: loginErrorMessage});
          return;
        }
        if (match) { // Create JSON Web Token if passwords match
          const token = jwt.sign(
            {email: user.email, editAuthorized: user.editAuthorized},
            jwtSecret,
            {
              expiresIn: 3000, //50 minutes
            },
          );
          res.status(200).json({token});
          return;
        } else { // Any other reasons for error, return 401.
          res.status(401).json({error: true, message: loginErrorMessage});
          return;
        }
      });
    }
  });
});

export default handler;
