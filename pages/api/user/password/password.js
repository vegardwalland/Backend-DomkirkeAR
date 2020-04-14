import nextConnect from 'next-connect';
import middleware from '../../../../middleware/middleware';
import argon2 from 'argon2';
import { findUser } from '../../../../lib/helperFunctions';

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
            res.status(500).json({error: true, message: "Du må være innlogget"})
        } else {
            const db = req.db;
            const {userEmail, oldPassword, newPassword } = req.body;
            findUser(db, userEmail, function(err, user) {
                if (err) {
                res.status(500).json({error: true, message: "Problem med å finne brukeren i databasen"});
                return;
                }
                if (!user) {
                    res.status(404).json({error: true, message: "Problem med å finne brukeren i databasen"});
                    return;
                } else {
                    authUser(db, userEmail, oldPassword, user.password, function(match) {
                        if (!match) { // Return error if passwords don't match
                            res.status(500).json({error: true, message: "Feil passord"});
                            return;
                        }
                        if (match) { // Change password
                            argon2.hash(newPassword)
                            .then(hash => {
                                db.collection('users')
                                .updateOne({email: userEmail}, { $set: { password: hash }});
                            });
                            res.status(200).json({error: false, message: "Ditt passord er oppdatert"});
                            return;
                        } else { // Any other reasons for error, return 401.
                            res.status(401).json({error: true, message: "Noe gikk galt"});
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