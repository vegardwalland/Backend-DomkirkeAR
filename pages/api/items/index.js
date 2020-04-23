import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { isEmpty } from '../../../libs/helperFunctions';

const handler = nextConnect();
const collection = 'items';

handler.use(middleware);

// Creates a new item
handler.post(async (req, res) => {

    let {name, description, lat, lon, pictureURI} = req.body;
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    return req.db.collection(collection).countDocuments( {name} ).then((count) => {
        if (count) {
            return Promise.reject(Error('An item with that name already exists.'));
        }

        if (isNaN(lat) || isNaN(lon)) {
            return Promise.reject(Error('Couldn\'t read GPS coordinates.'));
        }

        req.db.collection(collection).insertOne({
            name,
            description,
            lat,
            lon,
            pictureURI,
        });
    })
    .then(() => {
        res.status(201).send({
            status: 'ok',
            message: 'Item has been created.'
        });
    })
    .catch(error => res.send({
        status: 'error',
        message: error.toString(),
    }));
});

// Gets a list of items
handler.get(async (req, res) => {
    const itemList = [];

    req.db.collection(collection).find({}).forEach((dbItem) => {
        let item = {}

        if (!isEmpty(req.query)) {
            // Build an item containing the fields specified in query.
            const fields = req.query.fields.split(',');
            for (const field of fields) {
                item[field] = dbItem[field]
            }
        } else {
            // Default fields if none are specified.
            item = { "_id": dbItem["_id"], "name": dbItem["name"]}
        }

        itemList.push(item);
    })
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(itemList);
    })
    .catch(error => res.send({
        status: 'error',
        message: error.toString(),
    }));
});

export default handler;
