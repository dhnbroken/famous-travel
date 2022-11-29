const UserModel = require('./models/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: 'Create user successfully',
        });
      })
      .catch((err) => {
        res.json({
          message: 'An error occurred while creating',
        });
      });
  });
  // var username = req.body.username;
  // var password = req.body.password;
  // UserModel.findOne({
  //   username: username,
  // })
  //   .then((data) => {
  //     if (data) {
  //       res.json('username has been used');
  //     } else {
  //       return UserModel.create({
  //         username: username,
  //         password: password,
  //       });
  //     }
  //     res.json();
  //   })
  //   .then((data) => {
  //     res.json('Register successful');
  //   })
  //   .catch((err) => {
  //     res.status(500).json('Register failed');
  //   });
};

module.exports = {
  register,
};
