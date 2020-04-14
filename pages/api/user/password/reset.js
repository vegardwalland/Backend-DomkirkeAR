import sgMail from '@sendgrid/mail';
import middleware from '../../../../middleware/middleware';
import nextConnect from 'next-connect';
import crypto from 'crypto';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const user = await req.db
      .collection('users')
      .findOne({ email: req.body.email });
    if (!user) {
      res.json({
        ok: false,
        message: 'Denne emailen er ikke registrert.'
      });
      return
    }
      // Create a random token key and insert it in the db
    const token = crypto.randomBytes(32).toString('hex');
    await req.db.collection('tokens').createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } );
    await req.db.collection('tokens').insertOne({
      token,
      userEmail: user.email,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20)
    });
      // Send email to the user
    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: 'Gamle Stavanger AR. Endring av passord.',
      content: [ 
        {
        type: 'text/html',
        value: `<b>${user.email}</b>, her er din url for å endre passord: 
        ${process.env.WEB_URI}/forgetpassword/${token}`
      } 
    ],
    };
    await sgMail.send(msg);
    res.json({ message: 'Emailen er nå sendt til ' + user.email });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString()
    });
  }
});

export default handler;
