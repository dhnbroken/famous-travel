const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    organization: String,
    location: String,
    emailAddress: String,
    phoneNumber: String,
    birthDate: Date,
  },
  {
    collection: 'userInfo',
  },
);

const UserModel = conn.model('user', UserSchema);

module.exports = UserModel;
