const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://dhnbroken:namnamnam2210@auth.jpbzgo8.mongodb.net/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    avatarPath: { type: String, default: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organization: String,
    location: String,
    emailAddress: { type: String, required: true },
    phoneNumber: String,
    birthDate: String,
    accountId: String,
  },
  {
    collection: 'userInfo',
  },
);

const UserModel = conn.model('userInfo', UserSchema);

module.exports = UserModel;
