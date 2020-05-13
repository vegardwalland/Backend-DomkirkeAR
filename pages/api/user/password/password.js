import nextConnect from 'next-connect';
import middleware from '../../../../middleware/middleware';
import argon2 from 'argon2';
import { findUser } from '../../../../libs/helperFunctions';

const errorMessage = "Trouble finding the user or wrong password"

function authUser(db, email, password, hash, callback) {
    const collection = db.collection('users');
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
        if(!req.body.userEmail) {
            res.status(500).json({error: true, message: "You have to be logged in"})
        } else {
            const db = req.db;
            const {userEmail, oldPassword, newPassword } = req.body;
            findUser(db, userEmail, function(err, user) {
                if (err) {
                res.status(500).json({error: true, message: errorMessage});
                return;
                }
                if (!user) {
                    res.status(404).json({error: true, message: errorMessage});
                    return;
                } else {
                    authUser(db, userEmail, oldPassword, user.password, function(match) {
                        if (!match) { // Return error if passwords don't match
                            res.status(500).json({error: true, message: "Wrong password"});
                            return;
                        }
                        if (match) { // Change password
                            argon2.hash(newPassword)
                            .then(hash => {
                                db.collection('users')
                                .updateOne({email: userEmail}, { $set: { password: hash }});
                            });
                            res.status(200).json({error: false, message: "Your password has been updated"});
                            return;
                        } else { // Any other reasons for error, return 401.
                            res.status(401).json({error: true, message: "Something went wrong"});
                            return;
                        }
                    });
                }
            });
        }
    } catch (error) {
        res.json({
          error: true,
          message: error.toString(),
        });
    }
});


export default handler;
