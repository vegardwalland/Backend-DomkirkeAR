import assert from 'assert';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import isEmail from 'validator/lib/isEmail';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { findUser } from '../../../libs/helperFunctions';

const dbCollectionName = 'users';
const jwtSecret = process.env.JWT_SECRET;

function createUser(db, email, password, callback) {
  const collection = db.collection(dbCollectionName);
  try {
      argon2.hash(password)
      .then(hash => {
      // Store hash in password DB.
      collection.insertOne(
          {
            email,
            password: hash,
            editAuthorized: 'true',
          },
          function(err, userCreated) {
              assert.equal(err, null);
              callback(userCreated);
            },);
          });
  } catch (err) {
      //Password not hashed
      throw err;
  }
}

  const handler = nextConnect();

  handler.use(middleware);

  handler.post(async (req, res) => {
    try {
      assert.notEqual(null, req.body.email, 'Email required');
      assert.notEqual(null, req.body.password, 'Password required');
      assert.notEqual("", req.body.password, 'Password can\'t be blank');
      assert.notEqual("", req.body.email, 'Email can\'t be blank');
      assert.notEqual(false, isEmail(req.body.email), 'Email must be a valid email address');
    } catch (bodyError) {
      res.status(403).json({error: true, message: bodyError.message});
      return;
    }

    const db = req.db;
    const email = req.body.email;
    const password = req.body.password;

    // verify email does not exist already
      findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error creating User'});
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, email, password, function(creationResult) {
            //If user was created, create token with user info
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0];
              const token = jwt.sign(
                {email: user.email, editAuthorized: user.editAuthorized},
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                },
              );
              res.status(200).json({token});
              return;
            }
          });
        } else {
          // User exists
          res.status(403).json({error: true, message: 'A user with this email already exists'});
          return;
        }
      });
  });

      export default handler;
