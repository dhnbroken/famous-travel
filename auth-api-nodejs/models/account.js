const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/Auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: 'user',
  },
);

const AuthModel = conn.model('user', AuthSchema);

module.exports = AuthModel;
