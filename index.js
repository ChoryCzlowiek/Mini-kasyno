require('dotenv').config(); //  zaczytywanie zmiennych systemowych z `.env`
const express = require('express'); // framework do tworzenia serwerów WWW
const cors = require('cors'); // CROSS ORIGIN RESOURCE SHARING
const mongoose = require('mongoose'); // ORM do korzystania z bazy danych Mongo
const bodyParser = require('body-parser'); // middleware, które służy do
// zapisywania i odczywytania headera body z zapytań
const cookieParser = require('cookie-parser'); //  odczytywanie cookie z req.
const path = require('path') // moduł do operacji na ścieżkach
const User = require('./api/user/model');
const {
  getJWTFromCookie
} = require('./middleware/auth/getToken');
const jwt = require('jsonwebtoken');

const {
  PORT,
  DB_CONNECTION_STRING,
  AUTH_SECRET,
  COOKIE_AUTH_SECRET
} = process.env;
// DESTRUKTURYZACJA (const { propA: propB } = obj;)
/* równoważny zapis:
  const PORT = process.env.PORT;
  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
*/

mongoose.connect(
  DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log(
    `Successfully connected to the MongoDB at ${process.env.DB_CONNECTION_STRING}`
  );
});

const loggerMiddleware = (req, res, next) => {
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  next();
};

const app = express();
const api = express.Router();
const authRequired = require('./middleware/auth');

api.use('/user', require('./api/user/controller'));
api.use('/message', require('./api/message/controller'));

app.get('/protected-path', authRequired, (req, res) => {
  res.send('success');
});

api.get('/me', authRequired, (req, res) => {
  let errors = {};
  const verified = getJWTFromCookie(req.headers.cookie);

  if (!verified.login) {
    return res.status(404).json({
      errors: `Unauthorized user`
    });
  }

  User.findOne({
      login: verified.login
    },
    (err, user) => {
      if (err) {
        errors.me = err.message;
        res.status(500).json({
          errors
        });
      } else if (!user) {
        errors.me = 'User not found';
        res.status(404).json({
          errors
        });
      } else {
        const resUser = {
          ...user._doc
        };
        delete resUser.hash;
        res.json(resUser);
      }
    });
});

// /api express.Router('/api', api)
// /api/users express.Router('/users', usersController)
// /api/users/register (endpoint = function (req, res))
// /api/users/login    (endpoint = function (req, res))


/* .1 middleware */
// app.use(cors());
app.use(cookieParser(COOKIE_AUTH_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(loggerMiddleware);
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // template literal
});