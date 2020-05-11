
import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { findUser } from '../../../libs/helperFunctions';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const db = req.db;
    const email = req.body.email;

    findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'An error occurred'});
          return;
        }
        // If user is not found return 404
        if (!user) {
          res.status(404).json({error: true, message: 'Can\'t find user'});
          return;
        } else { // If user is found in db, change privilege.
            db.collection('users').updateOne(
                { "email" : email },
                {
                    $set: { "editAuthorized": "true" }
                }
            );
        let userUpdatedResponse = "User " + email + " can now create geopoints";
        res.status(200).json({error: false, message: userUpdatedResponse});
        }
    });
});

export default handler;
