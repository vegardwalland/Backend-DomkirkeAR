import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import argon2 from 'argon2';
import bcrypt from "bcryptjs";
import middleware from '../../middleware/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { password } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return; 
  }
  if (!password) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }
  try {
    var hashedPassword = await argon2.hash(password);
  } catch (err) {
    console.error(err);
  }
  const user = await req.db
    .collection('users')
    .insertOne({ email, password: hashedPassword})
    .then(({ ops }) => ops[0]);
  req.logIn(user, (err) => {
    console.log(err);
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;