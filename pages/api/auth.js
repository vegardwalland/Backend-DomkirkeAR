import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import passport from '../../lib/passport';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);
handler.post(passport.authenticate('local'), (req, res) => {
  // return our user object
  console.log(req);
  res.json({ user: extractUser(req) });
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;