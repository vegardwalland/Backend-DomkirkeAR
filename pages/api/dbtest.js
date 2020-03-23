import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const handler = nextConnect();
const collection = 'items'

handler.use(middleware);

handler.get(async (req, res) => {
    res.json(db);
});

export default handler;
