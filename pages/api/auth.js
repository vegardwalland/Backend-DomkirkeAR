const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const url = 'mongodb://localhost:27017';
const dbName = 'simple-login-db';
const loginErrorMessage = "Innlogging mislykkes"

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, email, callback) {
  const collection = db.collection('user');
  collection.findOne({email}, callback);
}

function authUser(db, email, password, hash, callback) {
  const collection = db.collection('user');
  try {
    argon2
      .verify(hash, password)
        .then(callback);
  } catch (err) {
      console.error("err = " + err);
  }
}

export default (req, res) => {
  if (req.method === 'POST') {
    //login
    try {
      assert.notEqual(null, req.body.email, 'Email required');
      assert.notEqual(null, req.body.password, 'Password required');
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    client.connect(function(err) {
      assert.equal(null, err);
      console.log('Connected to MongoDB server =>');
      const db = client.db(dbName);
      const email = req.body.email;
      const password = req.body.password;

      findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: loginErrorMessage});
          return;
        }
        if (!user) {
          res.status(404).json({error: true, message: loginErrorMessage});
          return;
        } else {
          authUser(db, email, password, user.password, function(match) {
            if (!match) {
              res.status(500).json({error: true, message: loginErrorMessage});
            }
            if (match) {
              const token = jwt.sign(
                {userId: user.userId, email: user.email},
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                },
              );
              res.status(200).json({token});
              return;
            } else {
              res.status(401).json({error: true, message: loginErrorMessage});
              return;
            }
          });
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};