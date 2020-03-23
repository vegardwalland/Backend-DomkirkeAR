import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const handler = nextConnect();
const collection = 'items'

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection(collection).findOne(req);
    console.log(doc);
    res.json(doc);
});

export default handler;
