const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const ImgSchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    collection: 'avatar',
  },
);
const ImgModel = conn.model('avatar', ImgSchema);

module.exports = ImgModel;
