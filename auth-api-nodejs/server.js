require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 4000;
const AuthModel = require('./models/account.js');
const CoordsModel = require('./models/places');
const UserModel = require('./models/user');
const ImgModel = require('./models/images');

// static user details
// const userData = {
//   password: '123qwe',
//   username: 'admin',
//   isAdmin: true,
// };

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// middleware that checks if JWT token exists and verifies it if it does exist.
// In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.headers.authorization;
  if (!token) return next(); // if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    } else {
      req.user = user; // set the user to req so other routes can use it
      next();
    }
  });
});

//storage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: Storage });

// app.post('/upload', (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const newImg = new ImgModel({
//         name: req.body.name,
//         image: {
//           data: req.file.filename,
//           contentType: 'image/png',
//         },
//       });
//       newImg
//         .save()
//         .then(() => res.send('success'))
//         .catch((err) => console.log(err));
//     }
//   });
// });

app.post('/register', upload.single('avatar'), (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var organization = req.body.organization;
  var location = req.body.location;
  var emailAddress = req.body.emailAddress;
  var phoneNumber = req.body.phoneNumber;
  var birthDate = req.body.birthDate;
  var avatarPath = req.body.avatarPath;

  AuthModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        return res.json('username has been used');
      } else {
        return AuthModel.create({
          username,
          password,
          emailAddress,
        }).then((data) => {
          UserModel.create({
            avatarPath,
            firstName,
            lastName,
            organization,
            location,
            emailAddress,
            phoneNumber,
            birthDate,
            accountId: data._id,
          });
        });
      }
    })
    .then((data) => {
      res.json('Register successful');
    })
    .catch((err) => {
      if (res.headersSent !== true) {
        res.send(err);
      }
    });
});

// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});

app.get('/coords', async (req, res, next) => {
  try {
    const result = await CoordsModel.find();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//register user
// app.post('/register', (req, res, next) => {
//   var username = req.body.username;
//   var password = req.body.password;
//   var firstName = req.body.firstName;
//   var lastName = req.body.lastName;
//   var organization = req.body.organization;
//   var location = req.body.location;
//   var emailAddress = req.body.emailAddress;
//   var phoneNumber = req.body.phoneNumber;
//   var birthDate = req.body.birthDate;

//   AuthModel.findOne({
//     username: username,
//   })
//     .then((data) => {
//       if (data) {
//         return res.json('username has been used');
//       } else {
//         return AuthModel.create({
//           username: username,
//           password: password,
//           userInfo: {
//             avatar: {
//               data: req.file.filename,
//               contentType: 'image/png',
//             },
//             firstName,
//             lastName,
//             organization,
//             location,
//             emailAddress,
//             phoneNumber,
//             birthDate,
//           },
//         });
//       }
//     })
//     .then((data) => {
//       res.json('Register successful');
//     })
//     .catch((err) => {
//       if (res.headersSent !== true) {
//         res.send(err);
//       }
//     });
// });

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  AuthModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        const token = utils.generateToken({ ...data, isAdmin: false });
        // return the token along with user details
        return res.json({
          user: {
            username,
            password,
            isAdmin: false,
          },
          token,
        });
      } else {
        res.status(300).json('Wrong username or password');
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      res.status(500).json('Server error');
    });
});

app.post('/coords', (req, res, next) => {
  var name = req.body.name;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var type = req.body.type;

  CoordsModel.findOne({
    name: name,
  })
    .then((data) => {
      if (data) {
        res.json('location has been saved before');
      } else {
        return CoordsModel.create({
          name: name,
          type: type,
          coordinates: {
            longitude: longitude,
            latitude: latitude,
          },
        });
      }
    })
    .then((data) => {
      res.json('Save location successful');
    })
    .catch((err) => {
      res.status(500).json('Save location failed');
    });
});

// verify the token and return it if it's valid
// app.get('/verifyToken', function (req, res) {
//   // check header or url parameters or post parameters for token
//   const token = req.body.token || req.query.token;
//   if (!token) {
//     return res.status(400).json({
//       error: true,
//       message: 'Token is required.',
//     });
//   }
//   // check token that was passed by decoding token using secret
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) {
//       return res.status(401).json({
//         error: true,
//         message: 'Invalid token.',
//       });
//     }

//     // return 401 status if the userId does not match.
//     if (user.userId !== userData.userId) {
//       return res.status(401).json({
//         error: true,
//         message: 'Invalid user.',
//       });
//     }
//     // get basic user details
//     const userObj = utils.getCleanUser(userData);
//     return res.json({ user: userObj, token });
//   });
// });

app.get('/coords/:id', async (req, res) => {
  const result = await CoordsModel.findOne({ _id: req.params.id });
  res.send(result);
});

app.delete('/coords/:id', async (req, res) => {
  const result = await CoordsModel.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.post('/user', (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var organization = req.body.Organization;
  var location = req.body.location;
  var emailAddress = req.body.emailAddress;
  var phoneNumber = req.body.phoneNumber;
  var birthDate = req.body.birthDate;

  UserModel.create({
    firstName,
    lastName,
    organization,
    location,
    emailAddress,
    phoneNumber,
    birthDate,
  })
    .then((data) => {
      res.json('Save info successful');
    })
    .catch((err) => {
      res.status(500).json('Save location failed');
    });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
