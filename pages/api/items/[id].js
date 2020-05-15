import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';
import { ObjectId } from 'mongodb';

const handler = nextConnect();
const collection = 'items';

handler.use(middleware);

// Deletes an item
handler.delete(async (req, res) => {
    req.db.collection(collection).deleteOne({_id: new ObjectId(req.query.id)}).then(() => {
        res.status(200).send({
            status: 'ok',
            message: 'Item has been deleted or didn\' exist.'
        });
    })
    .catch(error => res.send({
            status: 'error',
            message: error.toString(),
    }));
})

// Gets an item's details
handler.get(async (req, res) => {
    req.db.collection(collection).findOne({_id: new ObjectId(req.query.id)})
    .then((item) => {
        res.status(200).json(item);
    })
    .catch(error => res.send({
        status: 'error',
        message: error.toString(),
    }));
});

// Updates an item's details
handler.patch(async (req, res) => {
    let {name, description, lat, lon, pictureURI} = req.body;

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (isNaN(lat) || isNaN(lon)) {
        return Promise.reject(Error('Couldn\'t read GPS coordinates.'));
    }

    if (name === undefined || name === null || name === "") {
        return Promise.reject(Error("Name can not be empty."));
    }

    req.db.collection(collection).updateOne(
      { _id: new ObjectId(req.query.id) },
      {
        $set: {
         "name": name,
         "description": description,
         "lat": lat,
         "lon": lon,
         "pictureURI": pictureURI,
        },
      },
    )
    .then(dbRes => {
        if (dbRes.result.nModified === 0) {
            return Promise.reject(Error("Item doesn't exist."));
        }
        res.status(200).send({
        status: 'ok',
        message: 'Item has been updated.'
        });
    }).catch(error => res.send({
        status: 'error',
        message: error.toString(),
    }));
});

export default handler;
