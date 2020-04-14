
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { findUser } from '../../lib/helperFunctions';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const db = req.db;
    const email = req.body.email;

    findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Kunne ikke gjennomføre dette nå'});
          return;
        }
        // If user is not found return 404
        if (!user) {
          res.status(404).json({error: true, message: 'Brukeren finnes ikke'});
          return;
        } else { // If user is found in db, change privilege.
            db.collection('users').updateOne(
                { "email" : email },
                {
                    $set: { "editAuthorized": "true" }
                }
            );
        let userUpdatedResponse = "Bruker " + email + " har fått tilgang til å lage geopunkter";
        res.status(200).json({error: false, message: userUpdatedResponse});
        }
    });
});

export default handler;
