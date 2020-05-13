import nextConnect from 'next-connect';
import argon2 from 'argon2';
import middleware from '../../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  // check valid token
  const tokenDoc = await req.db.collection('tokens').findOne({
    token: req.query.token,
    type: 'passwordReset'
  });
  res.end(tokenDoc ? 'true' : 'false');
});

handler.put(async (req, res) => {
  // password reset
  try {
    if (!req.body.password) throw new Error('You must type inn a new password');
    const { value: tokenDoc } = await req.db
      .collection('tokens')
      .findOneAndDelete({ token: req.query.token, type: 'passwordReset' });
    if (!tokenDoc) throw new Error('Link expired');
    //Hash new password and Update db
    const password = await argon2.hash(req.body.password);
    await req.db
      .collection('users')
      .updateOne({ email: tokenDoc.userEmail }, { $set: { password } });
    res.json({ message: 'Your password is updated' });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString()
    });
  }
});

export default handler;
