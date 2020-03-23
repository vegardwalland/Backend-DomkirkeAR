import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    console.log("test");
    console.log(req);
    console.log(res);
    res.status(200).json({msg: 'Everything went totes fine.'})
});

export default handler;
