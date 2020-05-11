import sgMail from '@sendgrid/mail';
import middleware from '../../../../middleware/middleware';
import nextConnect from 'next-connect';
import crypto from 'crypto';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resMessage = "Email sent. Check your inbox for further instructions"

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
        message: resMessage
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
      subject: 'Gamle Stavanger AR. Password change.',
      content: [
        {
        type: 'text/html',
        value: `<b>${user.email}</b>, here is your url for requested password change:
        ${process.env.WEB_URI}/forgetpassword/${token}`
      }
    ],
    };
    await sgMail.send(msg);
    res.json({ message: resMessage });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString()
    });
  }
});

export default handler;
