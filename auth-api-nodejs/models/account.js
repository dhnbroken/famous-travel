const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/Auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    emailAddress: { type: String, required: true },
  },
  {
    collection: 'userAuth',
  },
);

const AuthModel = conn.model('userAuth', AuthSchema);

module.exports = AuthModel;
