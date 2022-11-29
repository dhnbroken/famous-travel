const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/PlacesList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const CoordsSchema = new Schema(
  {
    name: String,
    type: String,
    coordinates: {
      longitude: Number,
      latitude: Number,
    },
  },
  {
    collection: 'places',
  },
);
const CoordsModel = conn.model('places', CoordsSchema);

module.exports = CoordsModel;
